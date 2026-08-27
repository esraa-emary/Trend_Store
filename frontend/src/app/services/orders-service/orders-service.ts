import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { OrderResponse } from '../../models/iorder';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private _http = inject(HttpClient);
  readonly apiLink = `http://localhost:3000/orders`;

  orders = signal<OrderResponse | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    // حل خطأ 403: التأكد إن المستخدم أدمن قبل جلب كل الطلبات
    const role = localStorage.getItem('role');
    if (role === 'admin' || role === 'Admin') {
      this.loadAllOrders();
    }
  }

  loadAllOrders() {
    this.isLoading.set(true);
    this._http.get<OrderResponse>(`${this.apiLink}?limit=50`).subscribe({
      next: (res) => {
        this.orders.set(res);
        this.isLoading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to load orders');
        this.isLoading.set(false);
      }
    });
  }

  getMyOrders(): Observable<OrderResponse> {
    return this._http.get<OrderResponse>(`${this.apiLink}/my-orders`);
  }

  shipOrder(id: string): Observable<any> {
    return this._http.patch(`${this.apiLink}/${id}`, {});
  }
}
