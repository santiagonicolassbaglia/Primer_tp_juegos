import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego-ahorcado',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './juego-ahorcado.component.html',
  styleUrl: './juego-ahorcado.component.css'
})
export class JuegoAhorcadoComponent implements OnInit {
  palabraAdivinar: string = "";
  palabraOculta: string[] = [];
  letrasAdivinadas: string[] = [];
  intentosRestantes: number = 6;
  juegoTerminado: boolean = false;
  juegoPerdido: boolean = false;
  juegoGanado: boolean = false;
  letraInput: string = "";

  letrasDisponibles: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  palabrasAhorcado: string[] = ["programacion", "javascript", "angular", "typescript", "desarrollo"];

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    const palabraIndex = Math.floor(Math.random() * this.palabrasAhorcado.length);
    this.palabraAdivinar = this.palabrasAhorcado[palabraIndex];
    this.palabraOculta = [];
    for (let i = 0; i < this.palabraAdivinar.length; i++) {
      this.palabraOculta.push('_' + "  ");
    }
    this.letrasAdivinadas = [];
  }

  adivinarLetra(letra: string) {
    if (this.juegoTerminado || this.letrasAdivinadas.includes(letra)) {
      return;
    }
  
    if (this.palabraAdivinar.includes(letra)) {
      this.letrasAdivinadas.push(letra);
      this.actualizarPalabraOculta();
  
      if (this.palabraOculta.join('') === this.palabraAdivinar) {
        this.juegoGanado = true;
        this.juegoTerminado = true;
      }
    } else {
      this.intentosRestantes--;
      if (this.intentosRestantes === 0) {
        this.juegoPerdido = true;
        this.juegoTerminado = true;
      }
      this.letrasAdivinadas.push(letra); // Agregar la letra a letrasAdivinadas
    }
  }
  actualizarPalabraOculta() {
    this.palabraOculta = [];
  
    for (let i = 0; i < this.palabraAdivinar.length; i++) {
      const letra = this.palabraAdivinar[i];
      if (this.letrasAdivinadas.includes(letra)) {
        this.palabraOculta.push(letra);
      } else {
        this.palabraOculta.push('_' + "  ");
      }
    }
  }
  reiniciarJuego() {
    this.iniciarJuego();
    this.intentosRestantes = 6;
    this.juegoTerminado = false;
    this.juegoGanado = false;
    this.juegoPerdido = false;
    this.letrasAdivinadas = [];
    this.letraInput = "";
  }
 
  generarAyuda(): void {
    if (this.juegoTerminado) {
      return;
    }
  
    const palabraOcultaStr = this.palabraOculta.join('');
    const letrasNoAdivinadas = palabraOcultaStr.split('_').filter(letra => letra !== ' ');
    const letrasRestantes = this.letrasDisponibles.filter(letra => !this.letrasAdivinadas.includes(letra) && !letrasNoAdivinadas.includes(letra));
    
    if (letrasRestantes.length === 0) {
      return;
    }
  
    // Aquí seleccionamos una letra de la palabra a adivinar
    const palabraRestante = this.palabraAdivinar.split('').filter(letra => !this.letrasAdivinadas.includes(letra));
    
    if (palabraRestante.length === 0) {
      return;
    }
  
    const letraAyuda = palabraRestante[Math.floor(Math.random() * palabraRestante.length)];
    this.adivinarLetra(letraAyuda);
  }
}
