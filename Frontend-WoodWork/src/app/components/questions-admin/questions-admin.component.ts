import { Component, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { User } from 'src/app/models/users';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { UsersService } from 'src/app/services/users.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-questions-admin',
  templateUrl: './questions-admin.component.html',
  styleUrls: ['./questions-admin.component.css'],
  
})
export class QuestionsAdminComponent {

  dataSource = new MatTableDataSource<Pregunta>();
  displayedColumns: string[] = ["id", "pregunta", "fechaPublicado", "actions"];
  selectedDate!: Date | null;
  questions: Pregunta[] = [];
  questionsDate: Pregunta[] = [];
  dateHour!: Date | null;
  saveDate: any;
  delete: boolean = false;
  id_delete!: number;
  EsUser: boolean = false;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(private questionsService: PreguntasService, private router: Router,
    private activadedRoute: ActivatedRoute, private userService: UsersService){}

  ngOnInit(){
    this.foundUser();
    this.cargaQuestions();
    console.log("Hola");
  }

  filterCustomers(event:Event){
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro;
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.selectedDate?.setHours(0,0,0,0);
    this.saveDate = this.selectedDate?.toISOString();

    if(this.saveDate != null){
      this.questionsService.getQuestions().subscribe({
        next: (data: Pregunta[]) => {
          data.forEach((preg: Pregunta) => {
            const fechaPublicado: Date = new Date(preg.fechaPublicado);
            fechaPublicado.setHours(0,0,0,0);
            const dateFinal: any = fechaPublicado.toISOString();
            if(dateFinal == this.saveDate){
              this.questionsDate.push(preg);
            }
          });
          console.log(this.questionsDate);
          this.dataSource = new MatTableDataSource(this.questionsDate);
          this.dataSource.paginator = this.paginator;
          this.questionsDate = [];
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else{
      this.cargaQuestions();
    }
  } 

  foundUser():void{
    this.userService.getUser(3).subscribe({
      next: (data: User) => {
        if(data.type_usuario == 'admin')
        {
          this.EsUser = false;
          this.displayedColumns = ["id", "pregunta", "fechaPublicado", "actions"];
        }
        else{
          this.EsUser = true;
          this.displayedColumns = ["id", "pregunta", "fechaPublicado", "actions", "actions_user"];
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
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

  deleteQuestion():void{
    this.questionsService.deleteQuestion(this.id_delete).subscribe({
      next: (data) => {
        window.location.reload();
        this.delete = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
