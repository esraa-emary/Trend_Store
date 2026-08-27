import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products-service/products-service';
import { IProduct } from '../../../models/iproduct';
import { AddModal } from '../add-model/add-modal';
import { EditModal } from '../edit-modal/edit-modal';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, AddModal, EditModal],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css'
})
export class ManageProducts {
  productsService = inject(ProductsService);
  router = inject(Router);
  showAddModal = signal(false);
  editingProduct = signal<IProduct | null>(null);
  showDeleted = signal(false);

  openAddModal() {
    this.showAddModal.set(true);
  }

  openEditModal(product: IProduct) {
    this.editingProduct.set(product);
  }

  toggleDeleted() {
    this.showDeleted.set(!this.showDeleted());
    if (this.showDeleted()) {
      this.productsService.loadDeletedProducts();
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.productsService.loadProducts();
          alert('Product deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product.');
        }
      });
    }
  }

  restoreProduct(id: string) {
    this.productsService.restoreProduct(id).subscribe({
      next: () => {
        this.productsService.loadProducts();
        this.productsService.loadDeletedProducts();
        alert('Product restored successfully!');
      },
      error: (err) => {
        console.error('Error restoring product:', err);
        alert('Failed to restore product.');
      }
    });
  }

  closeModals(): void {
    this.showAddModal.set(false);
    this.editingProduct.set(null);
  }
}