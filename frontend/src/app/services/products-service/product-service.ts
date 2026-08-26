import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  description: string;
  stock?: number;
  status?: 'LIVE' | 'DRAFT';
}

interface ProductsResponse {
  data: Product[];
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  readonly products = signal<Product[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly id = signal<string | null>(null);
  readonly selectedProduct = computed(() =>
    this.products().find(product => product._id === this.id()) ?? null,
  );

  constructor() {
    void this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.isLoading.set(true);
    try {
      const result = await firstValueFrom(
        this.http.get<ProductsResponse>('/product'),
      );
      this.products.set(result.data ?? []);
      this.error.set(null);
    } catch {
      this.error.set('Unable to load products. Start the API server and try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  addProduct(product: Omit<Product, '_id'>): Product {
    const created: Product = { ...product, _id: crypto.randomUUID() };
    this.products.update(products => [...products, created]);
    return created;
  }

  updateProduct(id: string, product: Partial<Omit<Product, '_id'>>): void {
    this.products.update(products => products.map(item =>
      item._id === id ? { ...item, ...product } : item,
    ));
  }

  deleteProduct(id: string): void {
    this.products.update(products => products.filter(product => product._id !== id));
  }
}
