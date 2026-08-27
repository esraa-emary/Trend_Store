import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { OrderResponse } from '../../models/iorder';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    private _http = inject(HttpClient);
    isLoading = signal(false);
    error = signal<string | null>(null);

    apiLink = `http://localhost:3000/orders`;
    id = signal("");

    orders = httpResource<OrderResponse>(() => `${this.apiLink}?limit=50`);
    order = httpResource<OrderResponse>(() => `${this.apiLink}/${this.id()}`);
    
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

    getMyOrders(): Observable<any> {
        const token = localStorage.getItem('accessToken');
        return this._http.get(`${this.apiLink}/my-orders`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    createOrder(orderData: any): Observable<ApiResponse<any>> {
        return this._http.post<ApiResponse<any>>(this.apiLink, orderData);
    }

    shipOrder(orderId: string): Observable<ApiResponse<any>> {
        return this._http.patch<ApiResponse<any>>(`${this.apiLink}/${orderId}`, {});
    }

    setOrderId(id: string) {
        this.id.set(id);
    }
}