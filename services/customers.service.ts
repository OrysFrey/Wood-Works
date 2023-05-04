import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { raceWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "customers";

  constructor(private http:HttpClient) { }

  getCustomers(){
    return this.http.get<Customer[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getCustomer(id:number){
    return this.http.get<Customer>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }

  addCustomer(customer: Customer){
    return this.http.post<Customer>(this.ruta_servidor + "/" + this.recurso, customer);
  }

  updateCustomer(customer: Customer){
    return this.http.put<Customer>(this.ruta_servidor + "/" + this.recurso + "/" + customer.id.toString(), customer);
  }

  deleteCustomer(id:number){
    return this.http.delete(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }


}
