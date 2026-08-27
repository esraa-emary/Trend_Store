import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products-service/products-service';
import { IProduct } from '../../../models/iproduct';

export type ProductDraft = Omit<IProduct, '_id'>;

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {
  readonly product = input<IProduct | null>(null);
  readonly btnText = input('Save Product');
  readonly productSubmit = output<ProductDraft>();
  readonly isPage = input(true);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  isEditing = false;
  productModel: ProductDraft = this.emptyProduct();

  constructor() {
    effect(() => {
      const product = this.product();
      if (product) {
        this.productModel = { ...product };
        this.isEditing = true;
      }
    });

    effect(() => {
      const id = this.route.snapshot.queryParamMap.get('id');
      if (id) {
        const product = this.productsService.products().find(item => item._id === id);
        if (product) {
          this.productModel = { ...product };
          this.isEditing = true;
        }
      }
    });
  }

  submit(): void {
    const draft: ProductDraft = {
      ...this.productModel,
      price: Number(this.productModel["price"])
    };
    this.productSubmit.emit(draft);

    if (this.isPage()) {
      const id = this.product()?._id ?? this.route.snapshot.queryParamMap.get('id');
      if (id) {
        this.productsService.updateProduct(id, draft).subscribe({
          next: (response) => {
            console.log('Product updated:', response);
            this.productsService.loadProducts();
            void this.router.navigateByUrl('/admin/products');
          },
          error: (err) => {
            console.error('Error updating product:', err);
            alert('Failed to update product. Please try again.');
          }
        });
      } else {
        this.productsService.addProduct(draft).subscribe({
          next: (response) => {
            console.log('Product added:', response);
            this.productsService.loadProducts();
            void this.router.navigateByUrl('/admin/products');
          },
          error: (err) => {
            console.error('Error adding product:', err);
            alert('Failed to add product. Please try again.');
          }
        });
      }
    }
  }

  private emptyProduct(): ProductDraft {
    return {
      name: '', price: 0, category: '', quantity: 0, image: '', description: '', isDeleted: 'LIVE', deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}