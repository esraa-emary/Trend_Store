import { Component, inject, output } from '@angular/core';
import { ProductForm, ProductDraft } from '../product-form/product-form';
import { ProductsService } from '../../../services/products-service/products-service';

@Component({
  standalone: true,
  imports: [ProductForm],
  selector: 'app-add-modal',
  templateUrl: './add-modal.html',
  styleUrl: './add-modal.css',
})
export class AddModal {
  readonly closed = output<void>();
  private readonly productsService = inject(ProductsService);

  add(product: ProductDraft): void {
    this.productsService.addProduct(product).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        this.productsService.loadProducts();
        this.closed.emit();
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product. Please try again.');
      }
    });
  }
}
