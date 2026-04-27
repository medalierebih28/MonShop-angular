import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Tous les champs sont obligatoires';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.auth.signup({
      name: this.name,
      email: this.email,
      password: this.password
    });

    this.router.navigate(['/login']);
  }
}