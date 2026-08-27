import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private _http = inject(HttpClient);
  private _router = inject(Router);

  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please provide email and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this._http.post<any>('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);

        // طباعة الاستجابة في الكونسول لمعرفة شكل البيانات الحقيقي
        console.log('Login Response from Backend:', res);

        localStorage.setItem('token', res.token);

        // البحث عن الـ role والـ name في جميع الأماكن المحتملة
        const role = res.role || res.data?.user?.role || res.user?.role || res.data?.role;
        const name = res.name || res.data?.user?.name || res.user?.name || res.data?.name;

        if (role) {
          localStorage.setItem('role', role);
        }
        if (name) {
          localStorage.setItem('userName', name);
        }

        if (role === 'admin' || role === 'Admin') {
          this._router.navigate(['/admin/dashboard']);
        } else {
          this._router.navigate(['/profile']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Incorrect email or password.');
      }
    });
  }
}
