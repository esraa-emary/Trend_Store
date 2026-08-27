import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  cartService = inject(CartService);

  increase(productId: string, currentQty: number) {
    this.cartService.updateQuantity(productId, currentQty + 1);
  }

  decrease(productId: string, currentQty: number) {
    if (currentQty > 1) {
      this.cartService.updateQuantity(productId, currentQty - 1);
    } else {
      this.removeItem(productId);
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
