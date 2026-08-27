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
}