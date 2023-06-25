import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from '../models/pregunta';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  ruta_servidor: string = "http://localhost:3000";
  recurso: string = "preguntas";

  constructor(private http:HttpClient) { }

  getQuestions(){
    return this.http.get<Pregunta[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getQuestion(id:number){
    return this.http.get<Pregunta>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }

  addQuestion(question:Pregunta){
    return this.http.post<Pregunta>(this.ruta_servidor + "/" + this.recurso, question);
  }

  updateQuestion(question:Pregunta){
    return this.http.put<Pregunta>(this.ruta_servidor + "/" + this.recurso + "/" + question.id.toString(), question);
  }

  deleteQuestion(id:number){
    return this.http.delete<Pregunta>(this.ruta_servidor + "/" + this.recurso + "/" + id.toString());
  }
}
