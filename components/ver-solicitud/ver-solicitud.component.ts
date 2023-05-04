import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Presupuesto } from 'src/app/models/presupuesto';
import { Solicitud } from 'src/app/models/solicitud';
import { User } from 'src/app/models/users';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent {
  myForm!: FormGroup;
  admin: boolean = false;
  readonlyMode: boolean = true;
  date_register!: Date;
  date_final!: Date;
  Actualizar: boolean = true;
  id!: number;
  id_solicitur!: number;
  img_espacio!: string;
  imgForm!: FormGroup;
  god: boolean = false;
  type!: string;
  dataSource = new MatTableDataSource<Presupuesto>();
  displayedColumns: string[] = ["id", "monto", "actions"];
  myBudgets: Presupuesto[] = [];
  EsAdmin: boolean = false;
  EsUser: boolean = false;
  EsCustomer: boolean = false;
  EsCarpenter: boolean = false;
  id_carpenter_god!: number;

  constructor(private router: Router, private activatedRouter: ActivatedRoute,
    private proyectoService: ProyectosService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private userService: UsersService,
    private solicitudService: SolicitudesService, private budgetService: PresupuestosService){

      this.date_final = new Date();
      this.id = activatedRouter.snapshot.params["id_u"];
      this.id_solicitur = activatedRouter.snapshot.params["id"];
      this.id_carpenter_god = activatedRouter.snapshot.params["id_u"];
      console.log(this.id_carpenter_god);
    }

  ngOnInit(){
    this.getPermision();
    this.cargaMyBudgets();
    this.changeReadOnlyMode();
    this.getInfoRequest();
    this.reactiveForm();
  }

  reactiveForm(){
    this.myForm = this.formBuilder.group({
      id: [""],
      description:["",[Validators.required]],
      fecha_inicio:["",[Validators.required]],
      fecha_fin:["",[Validators.required]], 
      ancho_producto:["",[Validators.required]],
      alto_producto:["",[Validators.required]],
      largo_producto:["",[Validators.required]],
      ancho_espacio:["",[Validators.required]],
      alto_espacio:["",[Validators.required]],
      largo_espacio:["",[Validators.required]]
    });
    this.id = this.activatedRouter.snapshot.params["id_u"];
    this.id_solicitur = this.activatedRouter.snapshot.params["id"];

    this.imgForm = this.formBuilder.group({
      img_espacio: ["",[Validators.required]]
    });

    if(this.id_solicitur != 0 && this.id_solicitur != undefined){
      this.solicitudService.getSolicitud(this.id_solicitur).subscribe({
        next: (data) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("description")?.setValue(data.description);
          this.myForm.get("fecha_inicio")?.setValue(data.fecha_inicio);
          this.myForm.get("fecha_fin")?.setValue(data.fecha_fin);
          this.myForm.get("ancho_producto")?.setValue(data.ancho_producto);
          this.myForm.get("alto_producto")?.setValue(data.alto_producto);
          this.myForm.get("largo_producto")?.setValue(data.largo_producto);
          this.myForm.get("ancho_espacio")?.setValue(data.ancho_espacio);
          this.myForm.get("alto_espacio")?.setValue(data.alto_espacio);
          this.myForm.get("largo_espacio")?.setValue(data.largo_espacio);
          this.imgForm.get("img_espacio")?.setValue(data.img_espacio);
        },
        error: (err)=> {
          console.log(err);
        }
      });
    }
    else{
      this.id_solicitur= 0;
      this.Actualizar = false;
    }
  }

  getPermision():void{
    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        if(data.type_usuario == "Cliente"){
          this.EsCustomer = true;
        }
        if(data.type_usuario == "Carpintero"){
          this.EsCarpenter = true;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getInfoRequest():void{
    this.id_solicitur = this.activatedRouter.snapshot.params["id"];

    this.solicitudService.getSolicitudes().subscribe({
      next: (data: Solicitud[]) => {
        data.forEach((request: Solicitud) => {
          if(request.id == this.id_solicitur){
            this.id = request.id_customer;
            this.img_espacio = request.img_espacio;
          }
        });
      }
    });
  }

  changeReadOnlyMode():void{
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        data.forEach((user: User) => {
          if(user.id == this.id){
            if(user.type_usuario == "admin"){
              this.readonlyMode=true;
              console.log(this.id);
              this.god = true;
              this.EsAdmin = true;
            }
            if(user.type_usuario == "Carpintero"){
              this.readonlyMode = true;
              this.god = false;
              console.log("soy carpintero", this.readonlyMode);
            }
            if(user.type_usuario == "Cliente"){
              this.readonlyMode=false;
              this.god = true;
              this.EsUser = true;
            }
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  saveChanges():void{
    const solici: Solicitud = {
      id: this.id_solicitur,
      id_customer: this.id,
      description: this.myForm.get("description")!.value,
      fecha_inicio: this.myForm.get("fecha_inicio")!.value,
      fecha_fin: this.myForm.get("fecha_fin")!.value,
      ancho_producto: this.myForm.get("ancho_producto")!.value,
      alto_producto: this.myForm.get("alto_producto")!.value,
      largo_producto: this.myForm.get("largo_producto")!.value,
      ancho_espacio: this.myForm.get("ancho_espacio")!.value,
      alto_espacio: this.myForm.get("alto_espacio")!.value,
      largo_espacio: this.myForm.get("largo_espacio")!.value,
      img_espacio: this.imgForm.get("img_espacio")!.value
    }

    if(this.Actualizar){
      this.solicitudService.updateSolicitud(solici).subscribe({
        next: (data) => {
          this.snackBar.open("Se guardaron los cambio", "Ok", {duration:3000});
          this.router.navigate(["/dashboard-customer/"+this.id+"/solicitudes-customers/"+this.id]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else{
      this.solicitudService.addSolicitud(solici).subscribe({
        next: (data) => {
          this.router.navigate(["/dashboard-customer/"+this.id+"/solicitudes-customers/"+this.id]);
          this.snackBar.open("La Solicitud se agrego correctamente", "Ok", {duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  cargaMyBudgets():void{
    this.id_solicitur = this.activatedRouter.snapshot.params["id"];
    this.budgetService.getBudgets().subscribe({
      next: (data: Presupuesto[]) => {
        data.forEach((budget: Presupuesto) => {
          if(budget.id_solicitud == this.id_solicitur){
            this.myBudgets.push(budget);
          }
        });
        this.dataSource = new MatTableDataSource(this.myBudgets);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  volverProject():void{
    this.id = this.activatedRouter.snapshot.params["id_u"];
    this.userService.getUser(this.id).subscribe({
      next: (data)=> {
        if( data.id == this.id){
          this.type = data.type_usuario;
          if(this.id != 0 && this.id != undefined && this.type == "Carpintero"){
            // this.router.navigate(["/dashboard-carpenter/"+this.id+"/mis-proyectos/"+this.id]);
            console.log(this.type);
          }
          if(this.type == "admin"){
            this.router.navigate(["/dashboard-admin/customers-admin/"]);
          }
          if(this.type == "Cliente"){
            console.log("es cliente");
            this.router.navigate(["/dashboard-customer/"+this.id+"/solicitudes-customers/"+this.id]);
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
