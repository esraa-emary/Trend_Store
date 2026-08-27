import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { IProduct, ProductResponse } from '../../models/iproduct';
import { ApiResponse } from '../../models/api-response';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly _http = inject(HttpClient);
  readonly apiLink = 'http://localhost:3000/products';

  readonly products = signal<IProduct[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly id = signal<string | null>(null);

  readonly selectedProduct = computed(() =>
    this.products().find(product => product._id === this.id()) ?? null
  );

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this._http.get<ProductResponse>(this.apiLink).subscribe({
      next: (res) => {
        this.products.set(res.data ?? []);
        this.isLoading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Unable to load products.');
        this.isLoading.set(false);
      }
    });
  }

  hidden = signal<IProduct[]>([]);

  loadDeletedProducts() {
    this._http.get<ProductResponse>(`${this.apiLink}/hidden`).subscribe({
      next: (res) => {
        this.hidden.set(res.data ?? []);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  restoreProduct(id: string): Observable<any> {
    return this._http.patch(`${this.apiLink}/restore/${id}`, {});
  }

  addProduct(productData: any): Observable<ApiResponse<IProduct>> {
    return this._http.post<ApiResponse<IProduct>>(this.apiLink, productData);
  }

  updateProduct(id: string, productData: any): Observable<ApiResponse<IProduct>> {
    return this._http.patch<ApiResponse<IProduct>>(`${this.apiLink}/${id}`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this._http.patch(`${this.apiLink}/hide/${id}`, {});
  }
}