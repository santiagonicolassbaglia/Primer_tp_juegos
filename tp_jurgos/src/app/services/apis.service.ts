import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApisService {
 

  constructor(private http: HttpClient) { }

  public obtenerPersonaje(){
    return this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes');
  }

  public obtenerPersonajes(num: string){
    return this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=' + num);
  }
  }
 