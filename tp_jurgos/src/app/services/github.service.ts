import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

 private http = inject(HttpClient);

getData() {
 const obs= this.http.get('https://api.github.com/users');

 this.http.post('https://api.github.com/users', {name: 'Jurgos'}) 

 obs.subscribe((response) => {
  console.log(response);
 });

}



}
