import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../services/products-service/products-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.html',
  styleUrls: ['./manage-products.css']
})
export class ManageProducts {
  productsService = inject(ProductsService);
  router = inject(Router);

  isModalOpen = signal(false);
  isEditMode = signal(false);
  isLoadingModal = signal(false);

  productForm = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    quantity: 0,
    image: ''
  };

  openAddModal() {
    this.isEditMode.set(false);
    this.resetForm();
    this.isModalOpen.set(true);
  }

  openEditModal(product: any) {
    this.isEditMode.set(true);
    this.productForm = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      image: product.image
    };
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.productForm = { _id: '', name: '', description: '', price: 0, category: '', quantity: 0, image: '' };
  }

  saveProduct() {
    this.isLoadingModal.set(true);

    // فصل الـ _id عن باقي بيانات المنتج المراد إرسالها
    const { _id, ...productData } = this.productForm;

    if (this.isEditMode()) {
      this.productsService.updateProduct(_id, productData).subscribe({
        next: () => {
          this.isLoadingModal.set(false);
          this.closeModal();
          this.productsService.loadProducts();
        },
        error: (err) => {
          console.error(err);
          this.isLoadingModal.set(false);
        }
      });
    } else {
      this.productsService.addProduct(productData).subscribe({
        next: () => {
          this.isLoadingModal.set(false);
          this.closeModal();
          this.productsService.loadProducts();
        },
        error: (err) => {
          console.error(err);
          this.isLoadingModal.set(false);
        }
      });
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.productsService.loadProducts();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
