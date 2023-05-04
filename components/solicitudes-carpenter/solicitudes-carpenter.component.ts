import { Component } from '@angular/core';
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
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
