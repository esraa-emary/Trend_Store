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

  openAddModal() {
    this.showAddModal.set(true);
  }

  openEditModal(product: IProduct) {
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