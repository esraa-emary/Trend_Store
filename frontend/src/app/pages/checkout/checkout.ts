import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service/cart-service';
import { OrdersService } from '../../services/orders-service/orders-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  cartService = inject(CartService);
  ordersService = inject(OrdersService);
  router = inject(Router);

  // dummy before handling auth
  // userId = localStorage.getItem('userId');
  userId = '6a900f8dc8b065414fa2e904';

  placeOrder(e: Event) {
    e.preventDefault();
    
    const cartItems = this.cartService.cartItems();
    
    if (cartItems.length === 0) {
      window.alert('Your cart is empty!');
      return;
    }

    const orderData = {
      user: this.userId,
      products: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }))
    };

    this.ordersService.createOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order created:', response);
        window.alert('Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Error creating order:', err);
        window.alert('Failed to place order. Please try again.');
      }
    });
  }
}