import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { User } from 'src/app/models/users';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent {

  questionFound!: Pregunta;
  id_question!: number;
  name!: string;
  respuesta!: String;
  myForm!: FormGroup;
  Actualizar: boolean = true;

  constructor(private questionsService: PreguntasService, private userService: UsersService,
    private router: Router, private activadedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar){}

  ngOnInit(){
    this.foundQuestion();
    this.reactiveForm();
  }


  reactiveForm():void{
    this.myForm = this.formBuilder.group({
      respuesta:["",[Validators.required, Validators.maxLength(120)]]
    });

    this.id_question = this.activadedRoute.snapshot.params["id"];
    if(this.id_question != 0 && this.id_question != undefined){
      this.questionsService.getQuestion(this.id_question).subscribe({
        next: (data: Pregunta) => {
          this.myForm.get("respuesta")?.setValue(data.respuesta);
          this.respuesta = data.respuesta;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  saveChanges():void{
    const question: Pregunta = {
      id: this.questionFound.id,
      user_id: this.questionFound.user_id,
      pregunta: this.questionFound.pregunta,
      respuesta: this.myForm.get("respuesta")!.value,
      fechaPublicado: this.questionFound.fechaPublicado
    }
    
    this.respuesta = question.respuesta;

    if(this.Actualizar){
      this.questionsService.updateQuestion(question).subscribe({
        next: (data) => {
          this.snackBar.open("Se guardaron los cambio", "Ok", {duration:3000});
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  foundQuestion():void{
    this.id_question = this.activadedRoute.snapshot.params["id"];
    this.questionsService.getQuestion(this.id_question).subscribe({
      next: (data: Pregunta) => {
        this.questionFound = data;
        this.userService.getUser(this.questionFound.user_id).subscribe({
          next: (data: User) => {
            this.name = data.nombre_usuario;
            console.log(this.name);
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  backHome():void{
    this.router.navigate(["/dashboard-admin/questions-admin"]);
  }
}
