import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ver-budget',
  templateUrl: './ver-budget.component.html',
  styleUrls: ['./ver-budget.component.css']
})
export class VerBudgetComponent {
  myForm!: FormGroup;
  id!: number;
  EsAdmin: boolean = false;
  EsCustomer: boolean = false;
  EsCarpenter: boolean = false;
  tipo!: string;
  id_budget!: number;
  id_solicitud!: number;
  img_budget!: string;
  admin:boolean = false;
  Actualizar: boolean = true;
  img_data!: string;
  imgForm!: FormGroup;
  id_user!: number;
  type!: string;
  date!: Date;
  formattedDate!: string;
  monto_final!: number;
  readOnlyMode: boolean = false;
  estado_aceptado: string = "Aceptado";

  constructor(private router: Router, private activatedRouter: ActivatedRoute,
    private presupuestosService: PresupuestosService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private userService: UsersService){}

    ngOnInit(){
      this.getInfoBudget();
      this.setPermisions();
      this.reactiveForm();
    }

    reactiveForm(){
      this.myForm = this.formBuilder.group({
        id:[""],
        mano_obra:["",[Validators.required]],
        material:["",[Validators.required]],
        estado: ["",[Validators.required]],
        fecha_registro: [""]
      });
      this.id = this.activatedRouter.snapshot.params["id_u"];
      this.id_budget = this.activatedRouter.snapshot.params["id"];

      this.imgForm = this.formBuilder.group({
        img_boceto: ["", [Validators.required]]
      });

      if(this.id_budget != 0 && this.id_budget != undefined){
        this.presupuestosService.getBudget(this.id_budget).subscribe({
          next: (data) => {
            this.myForm.get("id")?.setValue(data.id);
            this.myForm.get("mano_obra")?.setValue(data.mano_obra);
            this.myForm.get("material")?.setValue(data.material);
            this.myForm.get("estado")?.setValue(data.estado);
            this.id_solicitud = data.id_solicitud;
            // const year: number = this.date.getFullYear();
            // console.log(year);
            // const month: number = this.date.getMonth() + 1; // Agregar 1 porque los meses en JavaScript comienzan en 0
            // console.log(month);
            // const day: number = this.date.getDate();
            // console.log(day);
            // this.formattedDate = year.toString();
            this.myForm.get("fecha_registro")?.setValue(this.date);
            this.imgForm.get("img_boceto")?.setValue(data.img_boceto);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
      else{
        this.id_budget = 0;
        this.Actualizar = false;
      }
    }

    getInfoBudget(){
      this.id_budget = this.activatedRouter.snapshot.params["id"];

      this.presupuestosService.getBudgets().subscribe({
        next: (data: Presupuesto[]) => {
          data.forEach((budget: Presupuesto) => {
            if(budget.id == this.id_budget){
              this.id = budget.id_carpenter;
              this.img_budget = budget.img_boceto;
              this.date = budget.fecha_registro;
              this.monto_final = budget.mano_obra+budget.material;
            }
          });
        }
      });
    }

    saveChanges():void{
      const budget: Presupuesto = {
        id: this.id_budget,
        id_carpenter: this.id,
        id_solicitud: this.id_solicitud,
        mano_obra: this.myForm.get("mano_obra")!.value,
        material: this.myForm.get("material")!.value,
        monto: this.monto_final,
        estado: this.myForm.get("estado")!.value,
        fecha_registro: this.date,
        img_boceto: this.imgForm.get("img_boceto")!.value
      }

      if(this.Actualizar){
        this.presupuestosService.updateBudget(budget).subscribe({
          next: (data) => {
            this.snackBar.open("Se guardaron los cambios", "Ok", {duration:3000});
            this.router.navigate(["/dashboard-carpenter/"+this.id+"/presupuestos/"+this.id]);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
    
    aceptarBudget():void{
      const budget: Presupuesto = {
        id: this.id_budget,
        id_carpenter: this.id,
        id_solicitud: this.id_solicitud,
        mano_obra: this.myForm.get("mano_obra")!.value,
        material: this.myForm.get("material")!.value,
        monto: this.monto_final,
        estado: this.estado_aceptado,
        fecha_registro: this.date,
        img_boceto: this.imgForm.get("img_boceto")!.value
      }

      this.presupuestosService.updateBudget(budget).subscribe({
        next: (data) => {
          this.snackBar.open("Se acepto el Presupuesto", "Ok", {duration:3000});
          this.router.navigate(["/dashboard-customer/"+this.id+"/solicitudes-customers/"+this.id]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

    rechazarBudget():void{
      const budget: Presupuesto = {
        id: this.id_budget,
        id_carpenter: this.id,
        id_solicitud: this.id_solicitud,
        mano_obra: this.myForm.get("mano_obra")!.value,
        material: this.myForm.get("material")!.value,
        monto: this.monto_final,
        estado: "Rechazado",
        fecha_registro: this.date,
        img_boceto: this.imgForm.get("img_boceto")!.value
      }

      this.presupuestosService.updateBudget(budget).subscribe({
        next: (data) => {
          this.snackBar.open("Se rechazado el Presupuesto", "Ok", {duration:3000});
          this.router.navigate(["/dashboard-customer/"+this.id+"/solicitudes-customers/"+this.id]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

    setPermisions():void{
      this.id = this.activatedRouter.snapshot.params["id_u"];
      this.id_user = this.activatedRouter.snapshot.params["id_u"];
      this.userService.getUser(this.id_user).subscribe({
        next: (data) => {
          if(data.id == this.id_user){
            this.tipo = data.type_usuario;
            if(this.id_user != 0 && this.id_user != undefined && this.tipo =="Carpintero"){
              this.EsCarpenter = true;
              this.readOnlyMode = false;
              console.log(this.readOnlyMode);
            }
            if(this.id_user != 0 && this.id_user != undefined && this.tipo =="Cliente"){
              this.EsCustomer = true;
              this.readOnlyMode = false;
              this.EsCustomer = true;
            }
            if(this.id_user != 0 && this.id_user != undefined && this.tipo =="admin"){
              this.EsAdmin = true;
              this.readOnlyMode = false;
            }
          }
        }
      })
    }

    volverBudget():void{
      this.id = this.activatedRouter.snapshot.params["id_u"];
      this.userService.getUser(this.id_user).subscribe({
        next: (data) => {
          if(data.id == this.id){
            this.type =  data.type_usuario;
            if(this.id != 0 && this.id != undefined && this.type == "Carpintero"){
              this.router.navigate(["/dashboard-carpenter/"+this.id+"/presupuestos/"+this.id]);
            }
            if(this.type == "admin"){
              this.router.navigate(["/dashboard-admin/carpenter-admin/"]);
            }
            if(this.type == "Cliente"){
              this.router.navigate(["/dashboard-customer/"+this.id+"/solicitudes-customers/"+this.id])
            }
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
}
