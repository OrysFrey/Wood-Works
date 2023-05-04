import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-carpenter-admin',
  templateUrl: './carpenter-admin.component.html',
  styleUrls: ['./carpenter-admin.component.css']
})
export class CarpenterAdminComponent {

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ["id","nombre_usuario", "type_usuario", "telefono", "correo_usuario", "password_usuario", "actions"];
  carpenters: User[] = [];
  delete: boolean = false;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private userService: UsersService){}

  ngOnInit(){
    this.cargaCarpenters();
  }

  filterCarpenters(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  cargaCarpenters():void{
    this.userService.getUsers().subscribe({
      next: (data:User[]) => {
        data.forEach((carpenter: User) => {
          if(carpenter.type_usuario == "Carpintero"){
            this.carpenters.push(carpenter);
          }
        });

        this.dataSource = new MatTableDataSource(this.carpenters);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteCarpenter(id:number){
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        this.cargaCarpenters();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
