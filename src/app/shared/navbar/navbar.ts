import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  isAccountOpen = signal(false);

  constructor(
    public authService: AuthService
  ) {}

  toggleAccountMenu(): void {
    this.isAccountOpen.update(
      (value) => !value
    );
  }

  closeAccountMenu(): void {
    this.isAccountOpen.set(false);
  }

  logout(): void {
    this.closeAccountMenu();
    this.authService.logout();
  }
}