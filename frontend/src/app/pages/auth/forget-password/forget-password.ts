import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-forget-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  async forgetPassword() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    try {
      await this.authService.forgetPassword({
        email: this.email
      });

      this.successMessage =
        'Password reset instructions have been sent to your email.';

      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    } catch (error: any) {
      this.errorMessage =
        error?.error?.message || 'Unable to process your request';
    } finally {
      this.loading = false;
    }
  }
}