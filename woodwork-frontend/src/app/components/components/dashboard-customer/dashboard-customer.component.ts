import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent {
  cerrar: boolean = false;
  id: number = this.activatedRouter.snapshot.params["id"];

  constructor(private router: Router, private activatedRouter: ActivatedRoute){}

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(["/login-register"]);
  }
}
