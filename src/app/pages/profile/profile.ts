import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: any = {};
  imageBase64: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.imageBase64 = this.user.image || '';
  }

  // 📸 upload image
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Choisissez une image valide');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // 💾 sauvegarde profil
  saveProfile() {
    this.user.image = this.imageBase64;
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Profil mis à jour ✅');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}