import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  cerrar: boolean = false;
  id!: number;

  constructor(private router: Router, private activatedRouter: ActivatedRoute){
    this.id = activatedRouter.snapshot.params["id"];
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(["/login-register"]);
  }

}
