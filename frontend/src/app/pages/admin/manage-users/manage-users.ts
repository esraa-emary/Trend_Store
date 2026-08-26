import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users-service/users-service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css']
})
export class ManageUsers {
  usersService = inject(UsersService);
  router = inject(Router);

  getTotalActiveUsers(): number {
    const users = this.usersService.users.value()?.data || [];
    return users.filter(user => user.isActive === true).length;
  }
}