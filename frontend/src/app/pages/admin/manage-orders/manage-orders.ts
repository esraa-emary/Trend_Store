import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../services/orders-service/orders-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-orders.html',
  styleUrls: ['./manage-orders.css']
})
export class ManageOrders {
  ordersService = inject(OrdersService);
  router = inject(Router);

  shipOrder(orderId: string) {
    if (confirm('Are you sure you want to ship this order?')) {
      this.ordersService.shipOrder(orderId).subscribe({
        next: (response) => {
          console.log('Order shipped:', response);
          this.ordersService.orders.reload();
        },
        error: (err) => {
          console.error('Error shipping order:', err);
          alert('Failed to ship order. Please try again.');
        }
      });
    }
  }
}