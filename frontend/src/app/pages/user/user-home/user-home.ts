import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { HeroComponent } from '../../../components/hero/hero';
import { PromoCardsComponent } from '../../../components/promo-cards/promo-cards';
import { FooterComponent } from '../../../components/footer/footer';

import { ProductComponent } from '../../../components/product/product';
import { ProductsService } from '../../../services/products-service/products-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ProductComponent,
    PromoCardsComponent,
    FooterComponent
  ],
  templateUrl: './user-home.html',
  styleUrl: './user-home.css'
})
export class HomeComponent {
  productsService = inject(ProductsService);
  router = inject(Router);
}