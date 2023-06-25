import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  EsInsertar: boolean = true;
  register!: FormGroup;
  login!: FormGroup;
  id!: number;
  loginError: boolean = false;
  usuarios: User[] = [];
  especialidad: boolean = false;
  tipo_usuario!: string;
  
  constructor(private formBuilder: FormBuilder, private userService: UsersService,
    private router: Router, private activatedRouter: ActivatedRoute,
    private sanckBar: MatSnackBar){}

  ngOnInit(){
    this.reactiveForm();
  }

  obtenerUsers():void{
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        data.forEach((usuario: User) => {
          this.usuarios.push(usuario);
        });
      }
    });
  }

  reactiveForm():void{
    this.register = this.formBuilder.group({
      id:[""],
      nombre_usuario:["",[Validators.required, Validators.maxLength(60)]],
      type_usuario:["",[Validators.required]],
      telefono:["",[Validators.required, Validators.maxLength(9)]],
      correo_usuario:["",[Validators.required, Validators.email]],
      password_usuario:["",[Validators.required]]
    });

    this.login = this.formBuilder.group({
      correo_usuario:["",[Validators.required]],
      password_usuario:["",[Validators.required]]
    });
  }

  ChangeValue(e:any){
    const container = document.getElementById('container');
    console.log(e.target.value)
    this.tipo_usuario=e.target.value;
    if(this.tipo_usuario== 'Carpintero'){
      this.especialidad = true;
      // container?.classList.add("big-container");
    }
    else{
      this.especialidad = false
      // container?.classList.remove("big-container");
    }
  }

  inicioSesion(){
    // this.userService.validateUser((this.login.get('correo_usuario')!.value),(this.login.get('password_usuario')!.value)).subscribe({
    //   next: (data) => {
    //     console.log("Inició sesion");
    //   },
    //   error: (err) => {
    //     this.loginError = true;
    //     console.log("No inicio");
    //   }
    // });
    console.log("hola");

    this.userService.getUsers().subscribe( element => {
      const user = element.find((a:User) => {
        return a.correo_usuario == this.login.get('correo_usuario')!.value && a.password_usuario == this.login.get('password_usuario')!.value
      });
      if(user){
        console.log("Entro");
        if(user.type_usuario == 'Cliente')
          this.router.navigate(["dashboard-customer/" + user.id]);
        if(user.type_usuario == 'Carpintero'){
          console.log("Soy Carpintero");
          this.router.navigate(["dashboard-carpenter/" + user.id]);
        }
        if(user.type_usuario == 'admin'){
          this.router.navigate(["dashboard-admin/home-admin"]);
        }
      }
      else{
        console.log("No entró");
        this.loginError = true;
        console.log("No inicio");
      }
    });
    //this.customers("Carpintero");
    
  }

  customers(type_usuario:string):void{
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        data.forEach((usa:User) => {
          if(usa.type_usuario == type_usuario){
            this.usuarios.push(usa);
            console.log(usa.nombre_usuario);
          }
        });
      }
    });
  }

  registro():void{
    const user: User = {
      id:this.id,
      nombre_usuario: this.register.get('nombre_usuario')!.value,
      type_usuario: this.register.get('type_usuario')!.value,
      telefono: this.register.get('telefono')!.value,
      correo_usuario: this.register.get('correo_usuario')!.value,
      password_usuario: this.register.get('password_usuario')!.value
    }

    if(this.EsInsertar){
      this.userService.addUser(user).subscribe({
        next: (data) => {
          this.sanckBar.open("Se ha registrado correctamente", "OK", {duration:2000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  cambiarSlide(){
    const container = document.getElementById('container');
    container?.classList.add("right-panel-active")
  }
  invertirSlide(){
    const container = document.getElementById('container');
    container?.classList.remove("right-panel-active")
  }
}
