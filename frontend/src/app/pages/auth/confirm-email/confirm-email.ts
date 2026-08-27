import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-confirm-email',
  imports: [FormsModule, RouterLink],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css'
})
export class ConfirmEmail {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  confirmOTP = '';

  errorMessage = '';
  successMessage = '';
  loading = false;

  async confirmEmail() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    try {
      await this.authService.confirmEmail({
        email: this.email,
        confirmOTP: this.confirmOTP
      });

      this.successMessage = 'Email confirmed successfully.';

      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1000);
    } catch (error: any) {
      this.errorMessage =
        error?.error?.message || 'Invalid email or confirmation code';
    } finally {
      this.loading = false;
    }
  }
}