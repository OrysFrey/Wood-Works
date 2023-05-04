import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-carpenters-customers',
  templateUrl: './carpenters-customers.component.html',
  styleUrls: ['./carpenters-customers.component.css']
})
export class CarpentersCustomersComponent {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ["id", "nombre_usuario", "type_usuario", "telefono", "correo_usuario", "actions"];
  carpenters: User[] = [];
  id!: number

  constructor(private userService: UsersService, private activatedRouter: ActivatedRoute){

  }

  ngOnInit(){
    this.getId();
    this.cargaCarpenter();
  }

  filterCarpenters(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  getId():void{
    this.id = this.activatedRouter.snapshot.params["id"];
  }

  cargaCarpenter():void{
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        data.forEach((carpenter: User) => {
          if(carpenter.type_usuario == "Carpintero"){
            this.carpenters.push(carpenter);
          }
        });
        this.dataSource = new MatTableDataSource(this.carpenters);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
