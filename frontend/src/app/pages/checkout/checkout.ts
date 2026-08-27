import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service/cart-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  cartService = inject(CartService);
  router = inject(Router);

  placeOrder(e: Event) {
    e.preventDefault();
    window.alert('Order placed successfully!');
    this.cartService.clearCart();
    this.router.navigateByUrl('/');
  }
}