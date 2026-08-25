import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [TitleCasePipe],
  selector: 'app-manage-products',
  styleUrl: './manage-products.css',
  templateUrl: './manage-products.html',
})
export class ManageProducts {
  columns: string[] = ['id', 'name', 'category', 'price', 'quantity', 'status'];

  products: any = [{
    id: 1,
    name: "esraa",
    category: "food",
    price: 200,
    quantity: 5,
    status: "deleted"
  }, {
    id: 1,
    name: "esraa",
    category: "food",
    price: 200,
    quantity: 5,
    status: "exist"
  }]
}
