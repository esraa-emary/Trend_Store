import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  cartService = inject(CartService);

  increase(productId: string) {
    this.cartService.updateQuantity(productId, 1);
  }

  decrease(productId: string) {
    this.cartService.updateQuantity(productId, -1);
  }

  removeItem(id: string) {
    this.cartService.removeFromCart(id);
  }
}