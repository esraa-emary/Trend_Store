import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  errorMessage = '';
  successMessage = '';
  loading = false;

  async signup() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    try {
      await this.authService.signup({
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password
      });

      this.successMessage =
        'Account created successfully. Please confirm your email.';

      setTimeout(() => {
        this.router.navigate(['/auth/confirm-email']);
      }, 1000);

    } catch (error: any) {
      this.errorMessage =
        error?.error?.message || 'Unable to create account';

    } finally {
      this.loading = false;
    }
  }
}