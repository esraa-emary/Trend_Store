import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products-service/products-service';
import { CartService } from '../../../services/cart-service/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetails implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  productId = signal<string | null>(null);

  ngOnInit(): void {
    // استقبال الـ ID من الـ URL وتحديثه في الخدمة
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId.set(id);
      this.productsService.id.set(id);
    });
  }

  addToCart(): void {
    const product = this.productsService.selectedProduct();
    if (product) this.cartService.addToCart(product);
  }
}