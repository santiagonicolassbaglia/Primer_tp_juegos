import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {
   
  //personajeImg: any;
  personaje!: any;
  rtaCorrecta: boolean = false;
  mensaje!: string;
  arrayPersonajes: any = [];
  empezar: boolean = false;
  img: any;
  puntos!: number;
  puntosAux!: number;
 
  usuario: Usuario = new Usuario( "","", "", "");
  ordenadas: boolean = false;
  juegoTerminado: boolean = false;
  correcta: boolean = false;
  public usuario$: Observable<any> = this.authService.auth.user;


  constructor(private apiSvc: ApisService, public router: Router, public authService: AuthService ) {
 
    this.usuario$.subscribe((result: any) => {
      this.usuario.mail = result['email'];
      this.usuario.code = result['uid']

    });
   }

  ngOnInit(): void {
  }

  async traerPersonaje(){
    this.apiSvc.obtenerPersonaje().subscribe((personaje:any) =>{
      this.personaje = personaje[0];
      this.img = personaje[0].image;
      this.arrayPersonajes.push(personaje[0]);
    },
      (error: any) => {
      console.log(error)}
    );
    this.cargarPersonajes();
  }


  cargarPersonajes(){
    this.arrayPersonajes = [];

    this.apiSvc.obtenerPersonaje().subscribe((personaje:any) =>{
      this.arrayPersonajes.push(personaje[0]);
    },
      (    error: any) => {
      console.log(error)}
    );

    this.apiSvc.obtenerPersonaje().subscribe((personaje:any) =>{
      this.arrayPersonajes.push(personaje[0]);
    },
      (    error: any) => {
      console.log(error)}
    );

    this.apiSvc.obtenerPersonaje().subscribe((personaje:any) =>{
      this.arrayPersonajes.push(personaje[0]);
    },
      (    error: any) => {
      console.log(error)}
    );
    setTimeout(() => {
      //this.validarRepetido(this.personaje.character);
      this.desordenarRespuestas();
      this.ordenadas = true;
    }, 500);
    
  }

  validarRepetido(personajeNombre: string){ 
    let eliminado = false;
    console.log(this.arrayPersonajes);
    for (let index = 0; index < this.arrayPersonajes.length; index++) {
      if(personajeNombre == this.arrayPersonajes[index].character){
        console.log(this.arrayPersonajes[index]);
        this.arrayPersonajes.splice(this.arrayPersonajes[index], 1);
        console.log("personaje eliminado repetido");
        
        eliminado = true;
        console.log(eliminado);
      } 
    }
    //console.log(eliminado);
    if(!eliminado){
      console.log("lista con personaje repetido eliminado");
      console.log(this.arrayPersonajes);
      this.arrayPersonajes.splice(this.arrayPersonajes[0], 1);
    }
    console.log(this.arrayPersonajes);
    this.arrayPersonajes.push(this.personaje)
    console.log("lista de personajes validada");
    console.log(this.arrayPersonajes);
    
  }

  desordenarRespuestas()
  {
    this.arrayPersonajes.sort(function (){return Math.random() - 0.5} );
  }

  correcto(nombre:string){
    if(nombre == this.personaje.character){
      this.rtaCorrecta = true;
      this.mensaje = "Correcto!";
      this.puntos += 10;
      this.puntosAux = this.puntos;
      this.correcta = true;
    }
    else{
       
      this.mensaje = "Perdiste!";
      this.puntos = 0;
      this.puntosAux = 0;
      this.juegoTerminado = true;
      this.correcta = false;
    }

    this.traerPersonaje();
  }

  async onEmpezar(){
    this.empezar = true;
    this.juegoTerminado = false;
    this.correcta = false;
    this.traerPersonaje();
    this.puntos = 0;
    this.puntosAux = 0;
 
    //this.validarRepetido(this.personaje.character);
  }

   

  
}
 