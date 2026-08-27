import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../../models/iproduct';
import { ProductsService } from '../../../services/products-service/products-service';
import { CartService } from '../../../services/cart-service/cart-service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  
  allProducts: IProduct[] = [];
  
  selectedCategory: string = 'All';
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 4;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.allProducts = this.productsService.products();
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  get filteredProducts(): IProduct[] {
    return this.allProducts.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || 
        product.category.toLowerCase() === this.selectedCategory.toLowerCase();
      
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }

  get paginatedProducts(): IProduct[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}