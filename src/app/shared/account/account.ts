import { Component } from '@angular/core';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class AccountComponent {

  constructor(
    public authService: AuthService
  ) {}

}