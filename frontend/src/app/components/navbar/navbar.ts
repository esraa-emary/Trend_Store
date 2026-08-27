import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  isMenuOpen = false;


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  closeMenu(): void {
    this.isMenuOpen = false;
  }

}