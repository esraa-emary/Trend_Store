import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  stats = [
    {
      title: 'Total Users',
      value: 150,
      icon: 'bi bi-people',
      color: 'primary'
    },
    {
      title: 'Total Products',
      value: 45,
      icon: 'bi bi-box-seam',
      color: 'warning'
    },
    {
      title: 'Total Orders',
      value: 230,
      icon: 'bi bi-cart-check',
      color: 'success'
    },
    {
      title: 'Revenue',
      value: '$12,450',
      icon: 'bi bi-currency-dollar',
      color: 'info'
    }
  ];

  recentOrders = [
    {
      id: '246522114',
      customer: 'Danial Donald',
      date: '26 Jan, 2023',
      total: 26.35,
      status: 'Pending'
    },
    {
      id: '246522115',
      customer: 'Jane Smith',
      date: '27 Jan, 2023',
      total: 89.99,
      status: 'Shipped'
    },
    {
      id: '246522116',
      customer: 'Bob Johnson',
      date: '28 Jan, 2023',
      total: 55.00,
      status: 'Processing'
    },
    {
      id: '246522117',
      customer: 'Alice Brown',
      date: '29 Jan, 2023',
      total: 145.50,
      status: 'Shipped'
    },
    {
      id: '246522118',
      customer: 'Charlie Wilson',
      date: '30 Jan, 2023',
      total: 75.00,
      status: 'Pending'
    }
  ];

  activeUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Manager',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'User',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'Admin',
      status: 'Active'
    }
  ];
}