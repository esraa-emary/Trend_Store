import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiLink = 'http://localhost:3000/auth';

  private readonly http = inject(HttpClient);

  resetToken = signal('');

  async login(data: Pick<IUser, 'email' | 'password'>) {
    return firstValueFrom(
      this.http.post(`${this.apiLink}/login`, data)
    );
  }

  async signup(
    data: Pick<IUser, 'email' | 'password' | 'name' | 'phoneNumber'>
  ) {
    return firstValueFrom(
      this.http.post(`${this.apiLink}/signup`, data)
    );
  }

  async confirmEmail(data: Pick<IUser, 'email' | 'confirmOTP'>) {
    return firstValueFrom(
      this.http.post(`${this.apiLink}/confirm-email`, data)
    );
  }

  async forgetPassword(data: Pick<IUser, 'email'>) {
    return firstValueFrom(
      this.http.post(`${this.apiLink}/forget-password`, data)
    );
  }

  async resetPassword(data: Pick<IUser, 'password'>) {
    return firstValueFrom(
      this.http.post(
        `${this.apiLink}/reset-password/${this.resetToken()}`,
        data
      )
    );
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  getPayloadFromToken() {
    const token = this.getToken();

    if (!token) return null;

    try {
      const payload = token.split('.')[1];

      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}