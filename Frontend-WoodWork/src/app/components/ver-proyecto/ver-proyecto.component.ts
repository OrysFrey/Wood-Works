import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyectos';
import { User } from 'src/app/models/users';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent {

  id!: number;
  id_proyecto!: number;
  img_proyecto!: string;
  nombre_poyecto!: string;
  myForm!: FormGroup;
  admin: boolean = false;
  Actualizar: boolean = true;
  img_data!: string;
  imgForm!: FormGroup;
  type!: string;
  readonlyMode: boolean = false;
  god: boolean = false;
  date_register!: Date;
  date_final!: Date;

  constructor(private router: Router, private activatedRouter: ActivatedRoute,
    private proyectoService: ProyectosService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private userService: UsersService){

      this.date_final = new Date();
    }

  ngOnInit(){
    this.changeReadOnlyMode();
    this.getNombreProyject();
    this.reactiveForm();
  }

  reactiveForm(){
    this.myForm = this.formBuilder.group({
      id:[""],
      nombre_producto: ["", [Validators.required]],
      ancho_producto: ["", [Validators.required]],
      alto_producto: ["", [Validators.required]],
      largo_producto: ["", [Validators.required]],
      precio_producto: ["",[Validators.required]],
    });
    this.id = this.activatedRouter.snapshot.params["id_u"];
    this.id_proyecto = this.activatedRouter.snapshot.params["id"];

    this.imgForm = this.formBuilder.group({
      img_producto: ["",[Validators.required]]
    })

    if(this.id_proyecto != 0 && this.id_proyecto != undefined){
      this.proyectoService.getProject(this.id_proyecto).subscribe({
        next: (data) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("nombre_producto")?.setValue(data.nombre_producto);
          this.myForm.get("ancho_producto")?.setValue(data.ancho_producto);
          this.myForm.get("alto_producto")?.setValue(data.alto_producto);
          this.myForm.get("largo_producto")?.setValue(data.largo_producto);
          this.myForm.get("precio_producto")?.setValue(data.precio_producto);
          this.imgForm.get("img_producto")?.setValue(data.img_producto);
        },
        error: (err) =>{
          console.log(err);
        }
      });
    }
    else{
      this.id_proyecto=0;
      this.Actualizar = false;
    }
  }

  getNombreProyject(){
    this.id_proyecto = this.activatedRouter.snapshot.params["id"];

    this.proyectoService.getProjects().subscribe({
      next: (data:Proyecto[]) => {
        data.forEach((porject: Proyecto) => {
          if(porject.id == this.id_proyecto){
            this.nombre_poyecto = porject.nombre_producto;
            this.id = porject.id_usuario;
            this.img_proyecto = porject.img_producto;
            this.date_register = porject.fecha_registro;
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
            }
            if(user.type_usuario == "Carpintero"){
              this.readonlyMode = false;
              this.god = true;
              console.log("soy carpintero", this.readonlyMode);
            }
            if(user.type_usuario == "Cliente"){
              this.readonlyMode=true;
              this.god = false;
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
    const proyecto: Proyecto = {
      id: this.id_proyecto,
      id_usuario: this.id,
      nombre_producto: this.myForm.get("nombre_producto")!.value,
      ancho_producto: this.myForm.get("ancho_producto")!.value,
      alto_producto: this.myForm.get("alto_producto")!.value,
      largo_producto: this.myForm.get("largo_producto")!.value,
      precio_producto: this.myForm.get("precio_producto")!.value,
      fecha_registro: this.date_final,
      img_producto: this.imgForm.get("img_producto")!.value
    }

    if(this.Actualizar){
      this.proyectoService.updateProject(proyecto).subscribe({
        next: (data) => {
          this.snackBar.open("Se guardaron los cambio", "Ok", {duration:3000});
          this.router.navigate(["/dashboard-carpenter/"+this.id+"/mis-proyectos/"+this.id]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else{
      this.proyectoService.addProject(proyecto).subscribe({
        next: (data) => {
          this.router.navigate(["/dashboard-carpenter/"+this.id+"/mis-proyectos/"+this.id]);
          this.snackBar.open("El Proyecto se agrego correctamente", "Ok", {duration:3000});
        },
        error:(err) => {
          console.log(err);
        }
      });
    }
  }

  volverProject():void{
    this.id = this.activatedRouter.snapshot.params["id_u"];
    this.userService.getUser(this.id).subscribe({
      next: (data)=> {
        if( data.id == this.id){
          this.type = data.type_usuario;
          if(this.id != 0 && this.id != undefined && this.type == "Carpintero"){
            this.router.navigate(["/dashboard-carpenter/"+this.id+"/mis-proyectos/"+this.id]);
            console.log(this.type);
          }
          if(this.type == "admin"){
            this.router.navigate(["/dashboard-admin/carpenter-admin/"]);
          }
          if(this.type == "Cliente"){
            console.log("es cliente");
            this.router.navigate(["/dashboard-customer/"+this.id+"/carpenters-customers/"+this.id]);
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
