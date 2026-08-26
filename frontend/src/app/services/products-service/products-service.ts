import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductResponse } from '../../models/iproduct';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    private _http = inject(HttpClient);

    apiLink = `http://localhost:3000/products`;
    id = signal("");

    products = httpResource<ProductResponse>(() => `${this.apiLink}?limit=50`);
}