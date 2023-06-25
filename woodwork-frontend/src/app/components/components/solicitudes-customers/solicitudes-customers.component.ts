import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitudes-customers',
  templateUrl: './solicitudes-customers.component.html',
  styleUrls: ['./solicitudes-customers.component.css']
})
export class SolicitudesCustomersComponent {
  dataSource = new MatTableDataSource<Solicitud>();
  displayedColumns: string[] = ["id", "description", "actions"];
  id!: number;
  myRequests: Solicitud[] = [];
  delete: boolean = false;
  id_delete!: number;
  id_solicitud: number = 0;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private solicitudService: SolicitudesService, private router: Router,
    private activatedRouter: ActivatedRoute){}

  ngOnInit(){
    this.cargaMyRequests();
  }

  cargaMyRequests():void{
    this.id = this.activatedRouter.snapshot.params["id"];
    this.solicitudService.getSolicitudes().subscribe({
      next: (data: Solicitud[]) => {
        data.forEach((solicitud: Solicitud) => {
          if(solicitud.id_customer == this.id){
            this.myRequests.push(solicitud);
          }
        });
        this.dataSource = new MatTableDataSource(this.myRequests);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteRequest():void{
    this.solicitudService.deleteSolicitud(this.id_delete).subscribe({
      next: (data) => {
        window.location.reload();
        this.delete = false;
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }
}
