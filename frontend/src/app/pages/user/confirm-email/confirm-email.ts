import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './confirm-email.html',
  styles: ['']
})
export class ConfirmEmail {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  email = this._route.snapshot.queryParams['email'] || '';
  confirmOTP = '';

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  onConfirm() {
    if (!this.email || !this.confirmOTP) {
      this.errorMessage.set('Please provide email and the OTP code.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this._http.post<any>('http://localhost:3000/auth/confirm-email', {
      email: this.email,
      confirmOTP: this.confirmOTP
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(res.message || 'Email confirmed successfully! Redirecting...');
        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Invalid or expired OTP.');
      }
    });
  }
}
