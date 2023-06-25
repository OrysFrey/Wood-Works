import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ClientesAdminComponent } from './components/clientes-admin/clientes-admin.component';
import { CarpenterAdminComponent } from './components/carpenter-admin/carpenter-admin.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { VerPerfilComponent } from './components/ver-perfil/ver-perfil.component';
import { DashboardCarpenterComponent } from './components/dashboard-carpenter/dashboard-carpenter.component';
import { MisProyectosComponent } from './components/mis-proyectos/mis-proyectos.component';
import { VerProyectoComponent } from './components/ver-proyecto/ver-proyecto.component';
import { PresupuestosCarpenterComponent } from './components/presupuestos-carpenter/presupuestos-carpenter.component';
import { HomeCarpenterComponent } from './components/home-carpenter/home-carpenter.component';
import { VerBudgetComponent } from './components/ver-budget/ver-budget.component';
import { QuestionsAdminComponent } from './components/questions-admin/questions-admin.component';
import { DashboardCustomerComponent } from './components/dashboard-customer/dashboard-customer.component';
import { CarpentersCustomersComponent } from './components/carpenters-customers/carpenters-customers.component';
import { VerPerfilCustomersComponent } from './components/ver-perfil-customers/ver-perfil-customers.component';
import { ProjectsCustomersComponent } from './components/projects-customers/projects-customers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SolicitudesCustomersComponent } from './components/solicitudes-customers/solicitudes-customers.component';
import { DatePipe } from '@angular/common';
import { VerSolicitudComponent } from './components/ver-solicitud/ver-solicitud.component';
import { SolicitudesCarpenterComponent } from './components/solicitudes-carpenter/solicitudes-carpenter.component';
import { NewBudgetComponent } from './components/new-budget/new-budget.component';
import { AnswerQuestionComponent } from './components/answer-question/answer-question.component';
import { QuestionsUsersComponent } from './components/questions-users/questions-users.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    DashboardAdminComponent,
    HomeAdminComponent,
    ClientesAdminComponent,
    CarpenterAdminComponent,
    MiPerfilComponent,
    VerPerfilComponent,
    DashboardCarpenterComponent,
    MisProyectosComponent,
    VerProyectoComponent,
    PresupuestosCarpenterComponent,
    HomeCarpenterComponent,
    VerBudgetComponent,
    QuestionsAdminComponent,
    DashboardCustomerComponent,
    CarpentersCustomersComponent,
    VerPerfilCustomersComponent,
    ProjectsCustomersComponent,
    SolicitudesCustomersComponent,
    VerSolicitudComponent,
    SolicitudesCarpenterComponent,
    NewBudgetComponent,
    AnswerQuestionComponent,
    QuestionsUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatPaginatorModule,
    DatePipe,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
