import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { Proyecto } from 'src/app/models/proyectos';
import { MatTableDataSource } from '@angular/material/table';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent {
  Actualizar: boolean = true;
  myForm!: FormGroup;
  id!: number;
  id_admin!:number;
  type!: string;
  dataSource = new MatTableDataSource<Proyecto>();
  displayedColumns: string[] = ["id","nombre_producto", "precio_producto", "actions"];
  myProjects: Proyecto[] = [];
  EsCustomer: boolean = true;
  EsCarpenter: boolean = true;
  id_user!: number;
  type_user!: string;
  EsAdmin: boolean = false;
  EsUser: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private userService: UsersService,
    private router: Router, private activateRouter:ActivatedRoute,
     private snackBar: MatSnackBar, private activedRouter: ActivatedRoute, private projectServie: ProyectosService){
      this.id_admin = activateRouter.snapshot.params["id_a"];
     }

  ngOnInit(){
    this.reactiveForm();
    this.cargaMyProjects();
  }

  reactiveForm():void{
    this.myForm = this.formBuilder.group({
      id:[""],
      nombre_usuario:[""],
      type_usuario:[""],
      telefono:[""],
      correo_usuario:[""],
      password_usuario:[""]
    });

    this.id = this.activateRouter.snapshot.params["id"];
    this.id_user = this.activateRouter.snapshot.params["id_u"];
    console.log("Hol",this.id_user);

    this.userService.getUser(this.id_user).subscribe({
      next: (data: User) => {
        if(data.id == this.id_user){
          console.log("encontró user");
          this.type_user = data.type_usuario;
          if(this.type_user == "admin"){
            this.EsAdmin = true;
            this.EsUser = false;
          }
          if(this.type_user == "Cliente"){
            this.EsAdmin = false;
            this.EsUser = true;
          }
        }
      }
    });
    
    if(this.id !=0 && this.id != undefined){
      this.userService.getUser(this.id).subscribe({
        next: (data) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("nombre_usuario")?.setValue(data.nombre_usuario);
          this.myForm.get("type_usuario")?.setValue(data.type_usuario);
          this.type = data.type_usuario;
          if(this.type == "Carpintero"){
            this.EsCustomer = false;
          }
          if(this.type == "Cliente"){
            this.EsCarpenter = false;
          }
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

  cargaMyProjects():void{
    this.id = this.activedRouter.snapshot.params["id"];
    this.projectServie.getProjects().subscribe({
      next: (data: Proyecto[]) => {
        data.forEach((proyec: Proyecto) => {
          if(proyec.id_usuario == this.id){
            this.myProjects.push(proyec);
          }
        });

        this.dataSource = new MatTableDataSource(this.myProjects);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  

  volverTabla():void{
    console.log("boton", this.type_user);
    if(this.type_user == "admin"){
      if(this.type == "Carpintero"){
        this.router.navigate(["/dashboard-admin/carpenter-admin"]);
      }
      else{
        this.router.navigate(["/dashboard-admin/clientes-admin"]);
      }
    }
    if(this.type_user == "Cliente"){
      this.router.navigate(["/dashboard-customer/1/carpenters-customers/1"]);
    }
    if(this.type_user == "Carpintero"){
      console.log("es carpintero");
    }
  }

}
