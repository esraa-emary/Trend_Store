import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products-service/products-service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent implements OnInit {

  @Input() products: IProduct[] = [];

  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
  }

}
