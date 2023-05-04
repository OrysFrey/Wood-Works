import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  Actualizar: boolean = true;
  myForm!: FormGroup;
  id!: number;
  
  constructor(private formBuilder: FormBuilder, private userService: UsersService,
    private router: Router, private activateRouter:ActivatedRoute,
     private snackBar: MatSnackBar){}

  ngOnInit(){
    this.reactiveForm();
  }

  reactiveForm():void{
    this.myForm = this.formBuilder.group({
      id:[""],
      nombre_usuario:["",[Validators.required, Validators.maxLength(60)]],
      type_usuario:[""],
      telefono:["",[Validators.required,Validators.maxLength(9)]],
      correo_usuario:["",[Validators.required,Validators.email]],
      password_usuario:["",[Validators.required]]
    });

    this.id = this.activateRouter.snapshot.params["id"];
    
    if(this.id !=0 && this.id != undefined){
      this.userService.getUser(this.id).subscribe({
        next: (data) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("nombre_usuario")?.setValue(data.nombre_usuario);
          this.myForm.get("type_usuario")?.setValue(data.type_usuario);
          this.myForm.get("telefono")?.setValue(data.telefono);
          this.myForm.get("correo_usuario")?.setValue(data.correo_usuario);
          this.myForm.get("password_usuario")?.setValue(data.password_usuario);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  saveChanges():void{
    const admin: User = {
      id: this.id,
      nombre_usuario: this.myForm.get("nombre_usuario")!.value,
      type_usuario: this.myForm.get("type_usuario")!.value,
      telefono: this.myForm.get("telefono")!.value,
      correo_usuario: this.myForm.get("correo_usuario")!.value,
      password_usuario:this.myForm.get("password_usuario")!.value
    }

    if(this.Actualizar){
      this.userService.updateUser(admin).subscribe({
        next: (data) => {
          this.snackBar.open("Se guardaron los cambio", "Ok", {duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  volverHome():void{
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        data.forEach((usuario: User) => {
          if(usuario.id == this.id){
            if(usuario.type_usuario == "admin"){
              this.router.navigate(["/dashboard-admin/home-admin"]);
            }
            if(usuario.type_usuario == "Carpintero"){
              this.router.navigate(["/dashboard-carpenter/"+this.id]);
            }
            if(usuario.type_usuario == "Cliente"){
              this.router.navigate(["/dashboard-customer/"+this.id]);
            }
          }
        })
      }
    })
    
  }
}
