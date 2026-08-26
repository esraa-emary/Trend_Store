import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../services/products-service/products-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-products.html',
  styleUrls: ['./manage-products.css']
})
export class ManageProducts {
  productsService = inject(ProductsService);
  router = inject(Router);
}