import { Component, inject, input, output } from '@angular/core';
import { Product, ProductsService } from '../../../services/products-service/product-service';
import { ProductForm, ProductDraft } from '../product-form/product-form';

@Component({
  standalone: true,
  imports: [ProductForm],
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css',
})
export class EditModal {
  readonly product = input.required<Product>();
  readonly closed = output<void>();
  private readonly productsService = inject(ProductsService);

  update(product: ProductDraft): void {
    this.productsService.updateProduct(this.product()._id, product);
    this.closed.emit();
  }
}
