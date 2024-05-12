import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [NgFor],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit{  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
  puntaje: number = 0;

  ngOnInit(): void {
    // Lógica para cargar la primera pregunta al iniciar el componente
    this.cargarPregunta();
  }

  cargarPregunta() {
    // Lógica para cargar una pregunta aleatoria y sus opciones de respuesta
    // Esto puede implicar el uso de una API para obtener preguntas y respuestas
    // Por ahora, supongamos que tenemos las preguntas y respuestas en un array
    const preguntas = [
      { pregunta: '¿Cuál es la capital de Francia?', opciones: ['Londres', 'Madrid', 'París', 'Berlín'], respuestaCorrecta: 'París' },
      // Otras preguntas aquí
    ];

    // Seleccionar una pregunta aleatoria del array
    const index = Math.floor(Math.random() * preguntas.length);
    const preguntaSeleccionada = preguntas[index];

    // Mostrar la pregunta y las opciones en la interfaz de usuario
    this.pregunta = preguntaSeleccionada.pregunta;
    this.opciones = preguntaSeleccionada.opciones;
    this.respuestaCorrecta = preguntaSeleccionada.respuestaCorrecta;
  }

  verificarRespuesta(respuesta: string) {
    // Verificar si la respuesta seleccionada es correcta
    if (respuesta === this.respuestaCorrecta) {
      // Incrementar el puntaje si la respuesta es correcta
      this.puntaje++;
    }

    // Cargar la siguiente pregunta
    this.cargarPregunta();
  }}