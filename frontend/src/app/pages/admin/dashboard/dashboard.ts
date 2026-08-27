import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/users-service/users-service';
import { ProductsService } from '../../../services/products-service/products-service';
import { OrdersService } from '../../../services/orders-service/orders-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  userService = inject(UserService);
  productsService = inject(ProductsService);
  ordersService = inject(OrdersService);

  stats = computed(() => {
    const usersList = this.userService.users().value?.data || [];
    const usersCount = usersList.length;

    const productsCount = this.productsService.products().length;

    // التعامل مع الـ signal الجديدة للـ orders
    const ordersRes = this.ordersService.orders();
    const ordersCount = ordersRes?.results || ordersRes?.data?.length || 0;

    const ordersList = ordersRes?.data || [];
    // تحديد أنواع البيانات لتجنب خطأ TypeScript
    const revenue = ordersList.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0);

    return [
      { title: 'Total Users', value: usersCount, icon: 'bi-people', color: 'primary' },
      { title: 'Total Products', value: productsCount, icon: 'bi-box-seam', color: 'warning' },
      { title: 'Total Orders', value: ordersCount, icon: 'bi-cart-check', color: 'success' },
      { title: 'Revenue', value: `$${revenue}`, icon: 'bi-currency-dollar', color: 'info' }
    ];
  });

  recentOrders = computed(() => {
    const orders = this.ordersService.orders()?.data || [];
    return orders.slice(0, 5);
  });

  activeUsers = computed(() => {
    const users = this.userService.users().value?.data || [];
    return users.slice(0, 5);
  });
}
