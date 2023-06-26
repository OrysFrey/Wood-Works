import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presupuesto } from '../models/presupuesto';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "presupuestos";

  constructor(private http:HttpClient) { }

  getBudgets(){
    return this.http.get<Presupuesto[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getBudget(id:number){
    return this.http.get<Presupuesto>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }

  addBudget(budget:Presupuesto){
    return this.http.post<Presupuesto>(this.ruta_servidor + "/" + this.recurso, budget);
  }

  updateBudget(budget: Presupuesto){
    return this.http.put<Presupuesto>(this.ruta_servidor + "/" + this.recurso + "/" + budget.id.toString(), budget);
  }

  deleteBudget(id:number){
    return this.http.delete<Presupuesto>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }
}
