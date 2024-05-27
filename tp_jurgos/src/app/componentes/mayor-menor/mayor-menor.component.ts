import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [NgIf,RouterModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit{

  puntaje: number = 0;
  cartaActual: number = 0;
  cartaAnterior: number = 0;
  resultado: string = '';
  intentosRestantes: number = 3;
  juegoGanado: boolean = false;
  juegoPerdido: boolean = false;
  puntos: number = 0;

  constructor() {}

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.puntaje = 0;
    this.intentosRestantes = 3;
    this.juegoGanado = false;
    this.juegoPerdido = false;
    this.resultado = '';
    this.generarCarta(true);
  }

  generarCarta(isFirst: boolean = false) {
    if (!isFirst) {
      this.cartaAnterior = this.cartaActual;
    }
    this.cartaActual = Math.floor(Math.random() * 12) + 1;
  }

  verificarResultado(eleccion: string) {
    const cartaAnteriorTemp = this.cartaActual; // Guarda la carta actual antes de generar una nueva
    this.generarCarta(); // Genera una nueva carta

    if (
      (eleccion === 'mayor' && this.cartaActual > cartaAnteriorTemp) ||
      (eleccion === 'menor' && this.cartaActual < cartaAnteriorTemp)
    ) {
      this.resultado = 'Correcto';
      this.puntaje++;

      if (this.puntaje === 5) {
        this.juegoGanado = true;
        this.resultado = 'Ganaste';
        this.puntos += 10;
      }
    } else {
      this.resultado = 'Incorrecto';
      this.intentosRestantes--;

      if (this.intentosRestantes === 0) {
        this.juegoPerdido = true;
        this.resultado = 'Perdiste';
      }
    }

    if (this.juegoGanado || this.juegoPerdido) {
      setTimeout(() => {
        this.iniciarJuego();
      }, 2000); 
    }
  }

  getCartaImagen(carta: number): string {
    return `../../../assets/imagenes/cartas/Carta${carta}.png`;
  }
}