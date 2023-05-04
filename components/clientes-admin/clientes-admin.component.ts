import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-admin',
  templateUrl: './clientes-admin.component.html',
  styleUrls: ['./clientes-admin.component.css']
})
export class ClientesAdminComponent {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ["id","nombre_usuario", "type_usuario", "telefono", "correo_usuario", "password_usuario", "actions"];
  customers: User[] = [];
  delete: boolean = false;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private userService: UsersService, private router:Router, 
    private activetedRouter: ActivatedRoute){}

  ngOnInit(){
    this.cargaCustomers();
  }

  filterCustomers(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  cargaCustomers():void{
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        data.forEach((customer: User) =>{
          if(customer.type_usuario == "Cliente"){
            this.customers.push(customer);
          }
        });

        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteCliente(id:number):void{
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        this.cargaCustomers();
        this.router.navigate(["/dashboard-admin/clientes-admin"]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
