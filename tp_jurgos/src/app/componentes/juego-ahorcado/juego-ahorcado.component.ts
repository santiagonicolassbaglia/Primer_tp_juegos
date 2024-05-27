import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-juego-ahorcado',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
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
  puntos: number = 0;  

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
    this.juegoTerminado = false;
    this.juegoGanado = false;
    this.juegoPerdido = false;
    this.intentosRestantes = 6;
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
        this.puntos+=10;  
        setTimeout(() => this.iniciarJuego(), 2000); // Reiniciar juego con nueva palabra después de 2 segundos
      }
    } else {
      this.intentosRestantes--;
      if (this.intentosRestantes === 0) {
        this.juegoPerdido = true;
        this.juegoTerminado = true;
      }
      this.letrasAdivinadas.push(letra);
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
    this.puntos = 0;
  }

  generarAyuda(): void {
    if (this.juegoTerminado) {
      return;
    }
this.puntos-=5;
    const palabraOcultaStr = this.palabraOculta.join('');
    const letrasNoAdivinadas = palabraOcultaStr.split('_').filter(letra => letra !== ' ');
    const letrasRestantes = this.letrasDisponibles.filter(letra => !this.letrasAdivinadas.includes(letra) && !letrasNoAdivinadas.includes(letra));

    if (letrasRestantes.length === 0) {
      return;
    }

    const palabraRestante = this.palabraAdivinar.split('').filter(letra => !this.letrasAdivinadas.includes(letra));

    if (palabraRestante.length === 0) {
      return;
    }

    const letraAyuda = palabraRestante[Math.floor(Math.random() * palabraRestante.length)];
    this.adivinarLetra(letraAyuda);
  }
  getImagenAhorcado(): string {
    return `../../../assets/imagenes/etapasAhorcado/ahorcado${6 - this.intentosRestantes}.png`;
  }
}
