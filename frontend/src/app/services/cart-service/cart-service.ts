import { Injectable, signal, computed } from '@angular/core';
import { IProduct } from '../../models/iproduct';

export interface CartItem {
  product: IProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // استخدام الـ Signals لإدارة حالة السلة تفاعلياً
  cartItems = signal<CartItem[]>([]);

  // حساب إجمالي عدد القطع في السلة
  totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  // حساب السعر الإجمالي الكلي
  totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));

  // إضافة منتج للسلة
  addToCart(product: IProduct) {
    this.cartItems.update(items => {
      const existingIndex = items.findIndex(item => item.product._id === product._id);
      if (existingIndex > -1) {
        // لو المنتج موجود قبل كده، نزوّد الكمية
        const updated = [...items];
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + 1 };
        return updated;
      } else {
        // لو منتج جديد، نضيفه بكمية 1
        return [...items, { product, quantity: 1 }];
      }
    });
  }

  // إزالة منتج من السلة
  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.product._id !== productId));
  }

  updateQuantity(productId: string, change: number) {
    this.cartItems.update(items => items
      .map(item => item.product._id === productId
        ? { ...item, quantity: item.quantity + change }
        : item,
      )
      .filter(item => item.quantity > 0),
    );
  }

  // تفريغ السلة تماماً بعد الـ Checkout
  clearCart() {
    this.cartItems.set([]);
  }
}