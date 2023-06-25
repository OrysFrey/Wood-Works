import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestosService } from 'src/app/services/presupuestos.service';

@Component({
  selector: 'app-presupuestos-carpenter',
  templateUrl: './presupuestos-carpenter.component.html',
  styleUrls: ['./presupuestos-carpenter.component.css']
})
export class PresupuestosCarpenterComponent {
  dataSource = new MatTableDataSource<Presupuesto>();
  displayedColumns: string[] = ["id", "id_solicitud", "mano_obra", "material", "estado", "actions"];
  myBudgets: Presupuesto[] = [];
  id!:number;
  budgetsStatus: Presupuesto[] = [];

  status: string[] = ['Rechazado', 'Aceptado', 'Pendiente'];
  selectedStatus!: string;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private presupuestoService: PresupuestosService, private router: Router,
    private activatedRouter:ActivatedRoute){}

  ngOnInit(){
    this.cargaMyBudgets();
  }

  filterCustomers(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  busgetsFilter(){
    if(this.selectedStatus != null){
      this.presupuestoService.getBudgets().subscribe({
        next: (data: Presupuesto[]) => {
          data.forEach((pres: Presupuesto) => {
            if(pres.estado == this.selectedStatus){
              this.budgetsStatus.push(pres);
            }
          });
          this.dataSource = new MatTableDataSource(this.budgetsStatus);
          this.dataSource.paginator = this.paginator;
          this.budgetsStatus = [];
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  cargaMyBudgets(){
    this.id = this.activatedRouter.snapshot.params["id"];
    this.presupuestoService.getBudgets().subscribe({
      next: (data: Presupuesto[]) => {
        data.forEach((budget: Presupuesto) => {
          if(budget.id_carpenter == this.id){
            this.myBudgets.push(budget);
          }
        });
        this.dataSource = new MatTableDataSource(this.myBudgets);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
