import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-santi-dice',
  standalone: true,
  imports: [NgIf],
  templateUrl: './santi-dice.component.html',
  styleUrl: './santi-dice.component.css'
})
export class SantiDiceComponent implements OnInit{


  secuencia: string[] = [];
  colores: string[] = ['rojo', 'verde', 'azul', 'amarillo'];
  secuenciaJugador: string[] = [];
  enJuego: boolean = false;
  mensaje: string = '';
  mensajeInicio: string = 'Presiona "Iniciar Juego" para comenzar';

  constructor() { }

  ngOnInit(): void {
  }

  iniciarJuego() {
    this.secuencia = [];
    this.secuenciaJugador = [];
    this.enJuego = true;
    this.mensaje = '';
    this.mensajeInicio = 'El juego ha comenzado. Memoriza la secuencia.';
    setTimeout(() => {
      this.mensajeInicio = '';
      this.agregarColorSecuencia();
    }, 2000);
  }

  agregarColorSecuencia() {
    const colorAleatorio = this.colores[Math.floor(Math.random() * this.colores.length)];
    this.secuencia.push(colorAleatorio);
    this.mostrarSecuencia();
  }

  mostrarSecuencia() {
    let i = 0;
    const intervalo = setInterval(() => {
      this.resaltarColor(this.secuencia[i]);
      i++;
      if (i >= this.secuencia.length) {
        clearInterval(intervalo);
      }
    }, 1500);
  }

  resaltarColor(color: string) {
    const elemento = document.getElementById(color);
    if (elemento) {
      elemento.classList.add('resaltar');
      setTimeout(() => {
        elemento.classList.remove('resaltar');
      }, 1000);
    }
  }

  seleccionarColor(color: string) {
    if (!this.enJuego) return;
    this.secuenciaJugador.push(color);
    const index = this.secuenciaJugador.length - 1;
    if (this.secuenciaJugador[index] !== this.secuencia[index]) {
      this.enJuego = false;
      this.mensaje = 'Perdiste! Inténtalo de nuevo.';
    } else if (this.secuenciaJugador.length === this.secuencia.length) {
      this.secuenciaJugador = [];
      this.mensaje = 'Bien hecho! Continuemos...';
      setTimeout(() => this.agregarColorSecuencia(), 1000);
    }
  }

}
