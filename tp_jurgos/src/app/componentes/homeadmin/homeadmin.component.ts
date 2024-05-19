import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homeadmin',
  standalone: true,
  imports: [],
  templateUrl: './homeadmin.component.html',
  styleUrl: './homeadmin.component.css'
})
export class HomeadminComponent {
 
  constructor(private auths: AuthService) { }
  ngOnInit(): void {
  }

  logout() {
    this.auths.logout();

  }

  esAdmin() {
     this.auths.esAdmin = true;
  }


}
