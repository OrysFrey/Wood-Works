import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "solicitudes";

  constructor(private http: HttpClient) { }

  getSolicitudes(){
    return this.http.get<Solicitud[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getSolicitud(id:number){
    return this.http.get<Solicitud>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }

  addSolicitud(solicitud:Solicitud){
    return this.http.post<Solicitud>(this.ruta_servidor + "/" + this.recurso, solicitud);
  }

  updateSolicitud(solicitud:Solicitud){
    return this.http.put<Solicitud>(this.ruta_servidor + "/" + this.recurso + "/" + solicitud.id.toString(), solicitud);
  }

  deleteSolicitud(id:number){
    return this.http.delete<Solicitud>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }
}
