import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-carpenter',
  templateUrl: './dashboard-carpenter.component.html',
  styleUrls: ['./dashboard-carpenter.component.css']
})
export class DashboardCarpenterComponent {
  cerrar: boolean = false;
  id: number = this.activedRouter.snapshot.params["id"];
  constructor(private router: Router, private activedRouter: ActivatedRoute){}

  

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(["/login-register"]);
  }
}
