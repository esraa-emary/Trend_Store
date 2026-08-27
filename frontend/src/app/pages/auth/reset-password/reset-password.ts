import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  password = '';
  confirmPassword = '';

  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor() {
    const token = this.route.snapshot.paramMap.get('token');

    if (token) {
      this.authService.resetToken.set(token);
    }
  }

  async resetPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.loading = true;

    try {
      await this.authService.resetPassword({
        password: this.password
      });

      this.successMessage =
        'Password reset successfully.';

      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1500);
    } catch (error: any) {
      this.errorMessage =
        error?.error?.message || 'Unable to reset password';
    } finally {
      this.loading = false;
    }
  }
}