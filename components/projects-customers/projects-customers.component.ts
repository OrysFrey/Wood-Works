import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-projects-customers',
  templateUrl: './projects-customers.component.html',
  styleUrls: ['./projects-customers.component.css']
})
export class ProjectsCustomersComponent {
  dataSource = new MatTableDataSource<Proyecto>();
  displayedColumns: string[] = ["id","nombre_producto", "ancho_producto", "alto_producto", "precio_producto", "actions"];
  Projects: Proyecto[] = [];
  id!: number;
  id_pryecto: number = 0;
  

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private projectServie: ProyectosService, private router: Router,
    private activedRouter: ActivatedRoute){}

  ngOnInit(){
    this.cargaProjects();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  filterProjects(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  cargaProjects():void{
    this.id = this.activedRouter.snapshot.params["id_u"];
    this.projectServie.getProjects().subscribe({
      next: (data:Proyecto[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
