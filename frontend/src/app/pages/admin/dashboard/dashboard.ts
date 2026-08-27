import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../../services/orders-service/orders-service';
import { UsersService } from '../../../services/users-service/users-service';
import { ProductsService } from '../../../services/products-service/products-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  ordersService = inject(OrdersService);
  usersService = inject(UsersService);
  productsService = inject(ProductsService);
  router = inject(Router);

  stats = [
    {
      title: 'Total Users',
      value: 0,
      icon: 'bi bi-people',
      color: 'primary'
    },
    {
      title: 'Total Products',
      value: 0,
      icon: 'bi bi-box-seam',
      color: 'warning'
    },
    {
      title: 'Total Orders',
      value: 0,
      icon: 'bi bi-cart-check',
      color: 'success'
    },
    {
      title: 'Revenue',
      value: '$0',
      icon: 'bi bi-currency-dollar',
      color: 'info'
    }
  ];

  getTotalUsers(): number {
    return this.usersService.users.value()?.totalUsers || 0;
  }

  getTotalProducts(): number {
    return this.productsService.products().length || 0;
  }

  getTotalOrders(): number {
    return this.ordersService.orders.value()?.totalOrders || 0;
  }

  getTotalRevenue(): string {
    const orders = this.ordersService.orders.value()?.data || [];
    const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    return `$${total.toFixed(2)}`;
  }
}