import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudesService } from 'src/app/services/solicitudes.service';


@Component({
  selector: 'app-solicitudes-carpenter', 
  templateUrl: './solicitudes-carpenter.component.html',
  styleUrls: ['./solicitudes-carpenter.component.css']
})
export class SolicitudesCarpenterComponent {
  dataSource = new MatTableDataSource<Solicitud>();
  displayedColumns: string[] = ["id", "description", "fecha_fin", "actions"];
  id!: number;
  delete: boolean = false;
  id_solicitud!: number;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private solicitudService: SolicitudesService, private router: Router,
    private activatedRouter: ActivatedRoute){}

  ngOnInit(){
    this.cargaRequest();
  }

  cargaRequest():void{
    this.id = this.activatedRouter.snapshot.params["id_u"];
    this.solicitudService.getSolicitudes().subscribe({
      next: (data: Solicitud[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
