import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "users";

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getCustomers(type_usuario:string){
    return this.http.get<User[]>(this.ruta_servidor + "/" + this.recurso + "/type_usuario/" + type_usuario);
  }

  getUser(id:number){
    return this.http.get<User>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }

  addUser(user: User){
    return this.http.post<User>(this.ruta_servidor + "/" + this.recurso, user);
  }

  updateUser(user: User){
    return this.http.put<User>(this.ruta_servidor + "/" + this.recurso + "/" + user.id.toString(), user);
  }

  deleteUser(id:number){
    return this.http.delete<User>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }

  validateUser(correo_usuario:string, password_usuario:string){
    return this.http.get<User>(this.ruta_servidor + "/" + this.recurso + "/correo_usuario/" + correo_usuario + "/password_usuario/" + password_usuario);
  }
}
