import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service';
import { OrdersService } from '../../../services/orders-service/orders-service';
import { UsersService } from '../../../services/users-service/users-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  ordersService = inject(OrdersService);
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private _router = inject(Router);

  userName = signal<string>('User');
  userEmail = signal<string>('');
  userRole = signal<string | null>(null);

  recentOrder = signal<any>(null);
  isLoadingOrder = signal(true);

  ngOnInit(): void {
    const payload = this.authService.getPayloadFromToken();
    this.userRole.set(payload?.role || localStorage.getItem('role'));

    if (payload?.id) {
      this.usersService.getUserById(payload.id).subscribe({
        next: (res) => {
          if (res.data) {
            this.userName.set(res.data.name);
            this.userEmail.set(res.data.email);
          }
        },
        error: (err) => console.error('Failed to load profile:', err)
      });
    }

    // جلب أحدث طلب
    this.ordersService.getMyOrders().subscribe({
      next: (res: any) => {
        const orders = res.data || [];
        if (orders.length > 0) {
          this.recentOrder.set(orders[0]);
        }
        this.isLoadingOrder.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoadingOrder.set(false);
      }
    });
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/auth/login']);
  }
}
