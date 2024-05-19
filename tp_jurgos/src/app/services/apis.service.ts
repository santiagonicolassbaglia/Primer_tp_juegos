import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApisService {
 

  constructor(private http: HttpClient) { }
//simpsons
  public obtenerPersonaje(){
    return this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes');
  }

  public obtenerPersonajes(num: string){
    return this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=' + num);
  }

// trivia 
 //crear get trivia con esta api 'https://the-trivia-api.com/v2/questions'
// Otros métodos para obtener datos de otras APIs


private apiUrlTrivia = 'https://the-trivia-api.com/v2/questions';
getTrivia(): Observable<any> {
  return this.http.get(this.apiUrlTrivia);
}}


 