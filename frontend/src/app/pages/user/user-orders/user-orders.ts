import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../../services/orders-service/orders-service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-orders.html',
  styles: ['']
})
export class UserOrders implements OnInit {
  ordersService = inject(OrdersService);
  myOrders = signal<any[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.ordersService.getMyOrders().subscribe({
      next: (res: any) => {
        this.myOrders.set(res.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Failed to load your orders.');
        this.isLoading.set(false);
      }
    });
  }
}
