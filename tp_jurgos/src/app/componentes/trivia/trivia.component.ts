import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { catchError } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent implements OnInit {
  preguntasTrivia: any[] = [];
  category: string = 'any'; // Categoría predeterminada (cualquiera)
  cantidadPreguntas: number = 10; // Cantidad predeterminada de preguntas (10)
  loading: boolean = false;
  error: string = '';
  triviaData: any;
  answer = '';  
  question = '';

  constructor(private apiService: ApisService) { }

  ngOnInit(): void {
    this.apiService.getTrivia().subscribe(data => {
      this.preguntasTrivia = data;
      console.log(this.preguntasTrivia); // Esto imprime los datos de trivia en la consola
    });
}
     
    onAnswerSelected(answer: string, question: any) {
      question.selectedAnswer = answer;

      if (answer === question.correct_answer) {
        question.correct = true;
      } else {
        question.correct = false;
      }

      question.answered = true;

      this.answer = answer;
      this.question = question;




    }




   
  
}

