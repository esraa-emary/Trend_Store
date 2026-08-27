import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart-service/cart-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styles: ['']
})
export class CheckoutComponent {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  cartService = inject(CartService);

  shippingAddress = '';
  phoneNumber = '';

  isLoading = signal(false);
  errorMessage = signal('');

  placeOrder() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    // إرسال طلب إنشاء الأوردر للباك إند بناءً على السلة الحالية
    this._http.post<any>('http://localhost:3000/orders', {
      shippingAddress: this.shippingAddress,
      phoneNumber: this.phoneNumber
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        // تفريغ السلة محلياً بعد نجاح الأوردر
        this.cartService.clearCart();
        // التوجيه لصفحة طلبات المستخدم
        this._router.navigate(['/my-orders']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to place order. Please try again.');
      }
    });
  }
}
