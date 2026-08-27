import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private _http = inject(HttpClient);
  private apiLink = 'http://localhost:3000/wishlist';

  wishlistIds = signal<string[]>([]);

  constructor() {
    this.loadWishlist();
  }

  // 1. جلب المنتجات المحفوظة بشكل آمن
  loadWishlist() {
    this._http.get<any>(this.apiLink).subscribe({
      next: (res) => {
        let items: any[] = [];
        if (Array.isArray(res.data)) {
          items = res.data;
        } else if (res.data && Array.isArray(res.data.products)) {
          items = res.data.products;
        } else if (Array.isArray(res)) {
          items = res;
        }

        const ids = items.map((item: any) => item.product?._id || item._id || item);
        this.wishlistIds.set(ids);
      },
      error: (err) => console.error('Error loading wishlist', err)
    });
  }

  // 2. إضافة أو إزالة المنتج
  toggleWishlist(productId: string) {
    const currentList = this.wishlistIds();

    if (currentList.includes(productId)) {
      // محاولة الحذف من المفضلة
      this._http.delete<any>(`${this.apiLink}/${productId}`).subscribe({
        next: () => {
          this.wishlistIds.update(ids => ids.filter(id => id !== productId));
        },
        error: (err) => {
          console.error('Error removing from wishlist:', err);

          // المعالجة الذكية: لو الباك إند رد بـ 404 (مش لاقيه)، هنفترض إنه اتمسح
          // ونشيله من الواجهة محلياً عشان القلب ميعلقش معاك
          if (err.status === 404) {
            this.wishlistIds.update(ids => ids.filter(id => id !== productId));
          }
        }
      });
    } else {
      // الإضافة للمفضلة
      this._http.post<any>(this.apiLink, { product: productId, productId: productId }).subscribe({
        next: () => {
          this.wishlistIds.update(ids => [...ids, productId]);
        },
        error: (err) => console.error('Error adding to wishlist:', err)
      });
    }
  }

  // 3. فحص حالة المنتج
  isInWishlist(productId: string): boolean {
    return this.wishlistIds().includes(productId);
  }
}
