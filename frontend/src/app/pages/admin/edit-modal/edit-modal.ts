import { Component, inject, input, output } from '@angular/core';
import { ProductsService } from '../../../services/products-service/products-service';
import { ProductForm, ProductDraft } from '../product-form/product-form';
import { IProduct } from '../../../models/iproduct';

@Component({
  standalone: true,
  imports: [ProductForm],
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css',
})
export class EditModal {
  readonly product = input.required<IProduct>();
  readonly closed = output<void>();
  private readonly productsService = inject(ProductsService);

  update(product: ProductDraft): void {
    this.productsService.updateProduct(this.product()._id, product).subscribe({
      next: (response) => {
        console.log('Product updated:', response);
        this.productsService.loadProducts();
        this.closed.emit();
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product. Please try again.');
      }
    });
  }
}