import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../models/iproduct';

export interface CartItem {
  product: IProduct;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _http = inject(HttpClient);
  private readonly apiLink = 'http://localhost:3000/cart';

  cartItems = signal<CartItem[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  totalItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  constructor() {
    this.getCart();
  }

  // جلب السلة من الداتابيز
 getCart() {
    this.isLoading.set(true);
    this._http.get<any>(this.apiLink).subscribe({
      next: (res) => {
        const items = res.data?.cartItems || [];
        this.cartItems.set(items);
        this.isLoading.set(false);
      },
      error: (err) => {
        // تجاهل خطأ 404 لأن معناه ببساطة إن السلة فارغة
        if (err.status === 404) {
            this.cartItems.set([]);
        } else {
            console.error(err);
        }
        this.isLoading.set(false);
      }
    });
  }
// .
  // إضافة منتج للسلة
  addToCart(productId: string, quantity: number = 1) {
    this._http.post<any>(this.apiLink, { productId, quantity }).subscribe({
      next: (res) => {
        const items = res.data?.cartItems || [];
        this.cartItems.set(items);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // تحديث كمية منتج في السلة
  updateQuantity(productId: string, quantity: number) {
    this._http.put<any>(`${this.apiLink}/${productId}`, { quantity }).subscribe({
      next: (res) => {
        const items = res.data?.cartItems || [];
        this.cartItems.set(items);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // حذف منتج من السلة
  removeFromCart(productId: string) {
    this._http.delete<any>(`${this.apiLink}/${productId}`).subscribe({
      next: (res) => {
        const items = res.data?.cartItems || [];
        this.cartItems.set(items);
      },
      error: (err) => {
        console.error(err);
        // لو السلة فضيت والباك إند حذفها
        this.cartItems.set([]);
      }
    });
  }

  // تفريغ السلة بالكامل
  clearCart() {
    this._http.delete<any>(`${this.apiLink}/clear`).subscribe({
      next: () => {
        this.cartItems.set([]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
