import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.css']
})
export class NewBudgetComponent {
  myForm!: FormGroup;
  EsInsertar: boolean = true;
  imgForm!: FormGroup;
  id_user!: number;
  id_request!: number;
  id_budget: number = 0;
  date_register!: Date;

  constructor(private router: Router, private activatedRouter: ActivatedRoute,
    private presupuestosService: PresupuestosService, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private userService: UsersService){
      this.id_user = activatedRouter.snapshot.params["id_u"];
      this.id_request = activatedRouter.snapshot.params["id_s"];
      this.date_register = new Date();
      console.log(this.date_register);
    }

  ngOnInit(){
    this.reactiveForm();
  }

  reactiveForm():void{
    this.myForm = this.formBuilder.group({
      id: [""],
      mano_obra:["",[Validators.required]],
      material:["",[Validators.required]]
    });

    this.imgForm = this.formBuilder.group({
      img_boceto:["",[Validators.required]]
    });
  }

  saveBudget():void{
    this.date_register = new Date();
    const budget: Presupuesto = {
      id: this.id_budget,
      id_carpenter: this.id_user,
      id_solicitud: this.id_request,
      mano_obra: this.myForm.get("mano_obra")!.value,
      material: this.myForm.get("material")!.value,
      monto: this.myForm.get("mano_obra")!.value + this.myForm.get("material")!.value,
      estado: "Pendiente",
      fecha_registro: this.date_register,
      img_boceto: this.imgForm.get("img_boceto")!.value
    }

    this.presupuestosService.addBudget(budget).subscribe({
      next:(data) => {
        this.router.navigate(["/dashboard-carpenter/"+this.id_user+"/presupuestos/"+this.id_user]);
        this.snackBar.open("El empleado se ingresó correctamente", "OK", {duration:2000});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  volverHome():void{
    this.router.navigate(["/dashboard-carpenter/"+this.id_user+"/ver-solicitud/"+this.id_user+"/"+this.id_request]);
  }
}
