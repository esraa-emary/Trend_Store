import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products-service/product-service';

@Component({
  imports: [TitleCasePipe],
  selector: 'app-manage-products',
  styleUrl: './manage-products.css',
  templateUrl: './manage-products.html',
})
export class ManageProducts {
  readonly productsService = inject(ProductsService);
  columns: string[] = ['id', 'name', 'category', 'price', 'quantity', 'status'];
}
