import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userKey = 'user';

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  signup(user: any) {
    if (this.isBrowser()) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  login(email: string, password: string): boolean {
    if (!this.isBrowser()) return false;

    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}');

    if (user.email === email && user.password === password) {
      localStorage.setItem('isLogged', 'true');
      return true;
    }
    return false;
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('isLogged');
    }
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return localStorage.getItem('isLogged') === 'true';
  }

  getUser() {
    if (!this.isBrowser()) return {};
    return JSON.parse(localStorage.getItem(this.userKey) || '{}');
  }
}