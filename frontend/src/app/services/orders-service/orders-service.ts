import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { OrderResponse } from '../../models/iorder';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    private _http = inject(HttpClient);

    apiLink = `http://localhost:3000/orders`;
    id = signal("");

    orders = httpResource<OrderResponse>(() => `${this.apiLink}?limit=50`);
}