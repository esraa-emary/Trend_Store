import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { OrderResponse } from '../../models/iorder';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    private _http = inject(HttpClient);

    apiLink = `http://localhost:3000/orders`;
    id = signal("");

    orders = httpResource<OrderResponse>(() => `${this.apiLink}?limit=50`);
    order = httpResource<OrderResponse>(() => `${this.apiLink}/${this.id()}`);
    ship = httpResource<OrderResponse>(() => `${this.apiLink}/${this.id()}`);

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