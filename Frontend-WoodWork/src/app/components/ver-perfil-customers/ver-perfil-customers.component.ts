import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ver-perfil-customers',
  templateUrl: './ver-perfil-customers.component.html',
  styleUrls: ['./ver-perfil-customers.component.css']
})
export class VerPerfilCustomersComponent {
  myForm!: FormGroup;
  id_carpenter!: number;
  id_user!: number;

  constructor(private formBuilder: FormBuilder, private userService: UsersService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(){

  }

  reactiveForm():void{
    this.myForm = this.formBuilder.group({
      id:["",[Validators.required]],
      nombre_usuario:["",[Validators.required]],
      type_usuario:["",[Validators.required]],
      telefono:["",[Validators.required]],
      correo_usuario:["",[Validators.required]]
    });

    this.id_carpenter = this.activatedRoute.snapshot.params["id"];
    this.id_user = this.activatedRoute.snapshot.params["id_u"];

    if(this.id_carpenter != 0 && this.id_carpenter != undefined){
      console.log("LLegue");
      this.userService.getUser(this.id_carpenter).subscribe({
        next: (data) => {
          this.myForm.get("id")?.setValue(data.id);
          this.myForm.get("nombre_usuario")?.setValue(data.nombre_usuario);
          this.myForm.get("type_usuario")?.setValue(data.type_usuario);
          this.myForm.get("telefono")?.setValue(data.telefono);
          this.myForm.get("correo_usuario")?.setValue(data.correo_usuario);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
