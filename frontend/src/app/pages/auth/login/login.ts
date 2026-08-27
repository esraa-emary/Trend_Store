import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  async login() {
    this.errorMessage = '';
    this.loading = true;

    try {
      const response: any = await this.authService.login({
        email: this.email,
        password: this.password
      });

        localStorage.setItem('accessToken', response.token);
      const payload = this.authService.getPayloadFromToken();

      if (payload?.role === 'admin') {
        await this.router.navigate(['/admin']);
      } else {
        await this.router.navigate(['/']);
      }
    } catch (error: any) {
      this.errorMessage =
        error?.error?.message || 'Invalid email or password';
    } finally {
      this.loading = false;
    }
  }
}