import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "proyectos";

  constructor(private http:HttpClient) { }

  getProjects(){
    return this.http.get<Proyecto[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getProject(id:number){
    return this.http.get<Proyecto>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }

  addProject(project:Proyecto){
    return this.http.post<Proyecto>(this.ruta_servidor + "/" + this.recurso, project);
  }

  updateProject(project:Proyecto){
    return this.http.put<Proyecto>(this.ruta_servidor + "/" + this.recurso + "/" + project.id.toString(), project);
  }

  deleteProject(id:number){
    return this.http.delete<Proyecto>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }
}
