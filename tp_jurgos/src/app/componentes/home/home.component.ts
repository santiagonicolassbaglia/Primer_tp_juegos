import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink, RouterOutlet } from '@angular/router';
 
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { } // Inject Router service

  ngOnInit(): void {
  }

  goToAhorcado() {
    this.router.navigate(['/juego-ahorcado']); // Navigate to '/juego-ahorcado' route
  }
}
