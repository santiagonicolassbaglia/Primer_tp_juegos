import { Component,OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink, RouterOutlet } from '@angular/router';
import { GithubService } from '../../services/github.service';
 
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
private gitSrv = inject(GithubService);
  constructor(private router: Router) { } // Inject Router service

  ngOnInit(): void {
  }

  Ahorcado() {
    this.router.navigate(['/juego-ahorcado']);  
  }
  MayorMenor() {
    this.router.navigate(['/mayor-menor']);  
}
}
