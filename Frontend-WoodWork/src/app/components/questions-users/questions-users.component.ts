import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-questions-users',
  templateUrl: './questions-users.component.html',
  styleUrls: ['./questions-users.component.css']
})
export class QuestionsUsersComponent {
  dataSource = new MatTableDataSource<Pregunta>();
  displayedColumns: string[] = ["id", "pregunta", "respuesta", "fechaPublicado"];
  questions: Pregunta[] = [];
  expandedRowIndex: number | null = null;
  myForm!: FormGroup;
  date_published!: Date;
  id_question!: number;
  id_user!: number;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private questionsService: PreguntasService, private router: Router,
    private activadedRoute: ActivatedRoute, private userService: UsersService, private formBuilder: FormBuilder,
    private sanckBar: MatSnackBar){}

  ngOnInit(){
    this.cargaQuestions();
    this.reactiveForm();
  }

  cargaQuestions():void{
    this.questionsService.getQuestions().subscribe({
      next: (data: Pregunta[]) => {
        data.forEach((preg: Pregunta) => {
          this.questions.push(preg);
        });

        this.dataSource = new MatTableDataSource(this.questions);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  filterCustomers(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  toggleRowExpansion(index: number): void {
    this.expandedRowIndex = this.expandedRowIndex === index ? null : index;
  }

  isRowExpanded(index: number): boolean {
    return this.expandedRowIndex === index;
  }

  reactiveForm():void{
    this.myForm = this.formBuilder.group({
      pregunta:["", [Validators.required, Validators.maxLength(120)]]
    });
  }

  saveQuestion():void{
    this.id_user = this.activadedRoute.snapshot.params["id_u"];
    this.date_published = new Date();
    const question: Pregunta = {
      id: this.id_question,
      user_id: this.id_user,
      pregunta: this.myForm.get('pregunta')!.value,
      respuesta: 'Sin respuesta',
      fechaPublicado: this.date_published
    }

    this.questionsService.addQuestion(question).subscribe({
      next:(data: Pregunta) => {
        window.location.reload();
        this.sanckBar.open("Se ha registrado correctamente", "OK", {duration:2000});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
