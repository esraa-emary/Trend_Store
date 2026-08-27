import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  private _http = inject(HttpClient);
  private _router = inject(Router);

  name = '';
  email = '';
  password = '';
  phoneNumber = '';

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  onSignup() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage.set('Please provide name, email and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this._http.post<any>('http://localhost:3000/auth/signup', {
      name: this.name,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set('Account created successfully! Redirecting to confirmation...');

        // التوجيه لصفحة تأكيد البريد الإلكتروني وإرسال الإيميل معها
        setTimeout(() => {
          this._router.navigate(['/confirm-email'], { queryParams: { email: this.email } });
        }, 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error while signing up. Please try again.');
      }
    });
  }
}
