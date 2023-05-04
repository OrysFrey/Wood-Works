import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent {
  dataSource = new MatTableDataSource<Proyecto>();
  displayedColumns: string[] = ["id","nombre_producto", "ancho_producto", "alto_producto", "precio_producto", "actions"];
  myProjects: Proyecto[] = [];
  id!: number;
  delete: boolean = false;
  id_proyecto:number = 0;
  id_delete!: number;
  // resultsLength: number = 17;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private projectServie: ProyectosService, private router: Router,
    private activedRouter: ActivatedRoute){}

  ngOnInit(){
    this.cargaMyProjects();
  }

  filterProjects(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  cargaMyProjects():void{
    this.id = this.activedRouter.snapshot.params["id"];
    this.projectServie.getProjects().subscribe({
      next: (data: Proyecto[]) => {
        data.forEach((proyec: Proyecto) => {
          if(proyec.id_usuario == this.id){
            this.myProjects.push(proyec);
          }
          // proyec.precio_producto = "s/." + (proyec.precio_producto);
        });

        this.dataSource = new MatTableDataSource(this.myProjects);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  deleteProject():void{
    this.projectServie.deleteProject(this.id_delete).subscribe({
      next: (data) => {
        window.location.reload();
        this.delete = false
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
