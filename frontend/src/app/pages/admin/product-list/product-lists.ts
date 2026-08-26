import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ProductsService, Product } from '../../../services/products-service/product-service';
import { AddModal } from '../add-model/add-modal';
import { EditModal } from '../edit-modal/edit-modal';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AddModal, EditModal],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent {
  productsService = inject(ProductsService);
  router = inject(Router);
  showAddModal = signal(false);
  editingProduct = signal<Product | null>(null);

  openAddModal() {
    this.showAddModal.set(true);
  }

  openEditModal(product: Product) {
    this.editingProduct.set(product);
  }

  async deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id);
    }
  }

  closeModals(): void {
    this.showAddModal.set(false);
    this.editingProduct.set(null);
  }
}