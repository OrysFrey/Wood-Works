import { Component } from '@angular/core';
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

  constructor(private presupuestoService: PresupuestosService, private router: Router,
    private activatedRouter:ActivatedRoute){}

  ngOnInit(){
    this.cargaMyBudgets();
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

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
