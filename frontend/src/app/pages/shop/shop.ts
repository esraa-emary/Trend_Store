import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products-service/products-service';
import { CartService } from '../../services/cart-service/cart-service';
import { WishlistService } from '../../services/wishlist-service/wishlist-service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.html',
  styles: ['']
})
export class Shop implements OnInit {
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  private _route = inject(ActivatedRoute);

  searchQuery = '';
  selectedCategory: string | null = null;
  isNewFilter: boolean = false;

  ngOnInit() {
    this.productsService.loadProducts();

    // الاستماع للـ Query Parameters لتطبيق الفلتر عند الضغط على الهيدر
    this._route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || null;
      this.isNewFilter = params['filter'] === 'new';
    });
  }

  get filteredProducts() {
    const query = this.searchQuery.toLowerCase().trim();
    let allProducts = this.productsService.products() || [];

    // 1. فلترة حسب التصنيف (Category) إن وُجد
    if (this.selectedCategory) {
      allProducts = allProducts.filter(p =>
        p.category?.toLowerCase() === this.selectedCategory?.toLowerCase()
      );
    }

    // 2. فلترة حسب الأحدث (New in باستخدام createdAt)
    if (this.isNewFilter) {
      allProducts = [...allProducts].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA; // ترتيب تنازلي من الأحدث للأقدم
      });
    }

    // 3. فلترة حسب شريط البحث النصي
    if (query) {
      allProducts = allProducts.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    return allProducts;
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId, 1);
  }

  toggleWishlist(productId: string) {
    this.wishlistService.toggleWishlist(productId);
  }
}
