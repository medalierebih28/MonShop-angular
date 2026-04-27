import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Tous les champs sont obligatoires';
      return;
    }

    const success = this.auth.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect';
    }
  }
}