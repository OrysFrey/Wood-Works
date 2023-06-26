import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ClientesAdminComponent } from './components/clientes-admin/clientes-admin.component';
import { CarpenterAdminComponent } from './components/carpenter-admin/carpenter-admin.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { VerPerfilComponent } from './components/ver-perfil/ver-perfil.component';
import { DashboardCarpenterComponent } from './components/dashboard-carpenter/dashboard-carpenter.component';
import { MisProyectosComponent } from './components/mis-proyectos/mis-proyectos.component';
import { VerProyectoComponent } from './components/ver-proyecto/ver-proyecto.component';
import { PresupuestosCarpenterComponent } from './components/presupuestos-carpenter/presupuestos-carpenter.component';
import { VerBudgetComponent } from './components/ver-budget/ver-budget.component';
import { DashboardCustomerComponent } from './components/dashboard-customer/dashboard-customer.component';
import { CarpentersCustomersComponent } from './components/carpenters-customers/carpenters-customers.component';
import { VerPerfilCustomersComponent } from './components/ver-perfil-customers/ver-perfil-customers.component';
import { ProjectsCustomersComponent } from './components/projects-customers/projects-customers.component';
import { SolicitudesCustomersComponent } from './components/solicitudes-customers/solicitudes-customers.component';
import { VerSolicitudComponent } from './components/ver-solicitud/ver-solicitud.component';
import { SolicitudesCarpenterComponent } from './components/solicitudes-carpenter/solicitudes-carpenter.component';
import { NewBudgetComponent } from './components/new-budget/new-budget.component';
import { QuestionsAdminComponent } from './components/questions-admin/questions-admin.component';
import { AnswerQuestionComponent } from './components/answer-question/answer-question.component';
import { QuestionsUsersComponent } from './components/questions-users/questions-users.component';

const routes: Routes = [
  {path:'', component:LoginRegisterComponent},
  {path:'login-register', component: LoginRegisterComponent},
  {path:'dashboard-admin', component:DashboardAdminComponent,
  children:[{path:'home-admin',component:HomeAdminComponent},
  {path:'clientes-admin', component:ClientesAdminComponent},
  {path:'carpenter-admin', component:CarpenterAdminComponent},
  {path:'questions-admin', component: QuestionsAdminComponent},
  {path:'answer-question/:id_u/:id', component: AnswerQuestionComponent},
  {path:'mi-perfil/:id', component:MiPerfilComponent},
  {path:'ver-perfil/:id_u/:id', component:VerPerfilComponent},
  {path:'ver-proyecto/:id_u/:id', component: VerProyectoComponent}]},
  {path:'dashboard-carpenter/:id', component:DashboardCarpenterComponent,
  children:[{path:'mi-perfil/:id',component:MiPerfilComponent},
  {path:'mis-proyectos/:id', component: MisProyectosComponent},
  {path:'ver-proyecto/:id_u/:id', component: VerProyectoComponent},
  {path:'new-proyecto/:id_u/:id', component: VerProyectoComponent},
  {path:'presupuestos/:id', component:PresupuestosCarpenterComponent},
  {path:'ver-budget/:id_u/:id', component: VerBudgetComponent},
  {path:'solicitudes-carpenter/:id_u', component: SolicitudesCarpenterComponent},
  {path:'ver-solicitud/:id_u/:id', component: VerSolicitudComponent},
  {path:'new-budget/:id_u/:id_s', component: NewBudgetComponent}]},
  {path:'dashboard-customer/:id', component: DashboardCustomerComponent,
  children:[{path:'mi-perfil/:id', component: MiPerfilComponent},
  {path:'carpenters-customers/:id', component: CarpentersCustomersComponent},
  {path:'ver-perfil-customers/:id_u/:id', component: VerPerfilComponent},
  {path:'ver-proyecto/:id_u/:id', component: VerProyectoComponent},
  {path:'projects-customers/:id_u', component: ProjectsCustomersComponent},
  {path:'questions-customers/:id_u', component: QuestionsUsersComponent},
  {path:'solicitudes-customers/:id', component: SolicitudesCustomersComponent},
  {path:'new-solicitud/:id_u/:id', component: VerSolicitudComponent},
  {path:'ver-solicitud/:id_u/:id', component: VerSolicitudComponent},
  {path:'ver-budget/:id_u/:id', component: VerBudgetComponent}]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
