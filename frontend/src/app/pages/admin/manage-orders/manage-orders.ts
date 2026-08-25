import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './manage-orders.html',
  styleUrl: './manage-orders.css',
})
export class ManageOrders {
  columns: string[] = ['id', 'customer id', 'total price', 'status'];
  
  orders: any[] = [
    {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }, {
      id: 1,
      "customer id": "esraa",
      "total price": 111,
      status: "active"
    }
  ];
}