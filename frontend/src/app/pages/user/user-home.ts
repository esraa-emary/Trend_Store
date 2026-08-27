import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HeroComponent } from '../../components/hero/hero';
import { PromoCardsComponent } from '../../components/promo-cards/promo-cards';
import { FooterComponent } from '../../components/footer/footer';

import { ProductComponent } from '../../components/product/product';
import { Product } from '../../services/product.service';


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

  products: Product[] = [

    {
      id:1,
      name: 'Silk Slip Dress',
      price: 168,
      category: 'Dresses',
      color: 'Black',
      image: '../../images/premium_photo-1675186049366-64a655f8f537.avif',
      badge: 'BESTSELLER',
      link: '/prices'
    },

    {
      id:2,
      name: 'Tailored Wool Blazer',
      price: 245,
      category: 'Outerwear',
      color: 'Charcoal',
      image: '../../images/photo-1610652492500-ded49ceeb378.avif',
      badge: 'NEW IN',
      link: '/prices'
    },

    {
      id:3,
      name: 'Everyday Knit Set',
      price: 138,
      category: 'Knitwear',
      color: 'Oat',
      image: '../../images/photo-1594938298603-c8148c4dae35.avif',
      badge: 'LIMITED',
      link: '/prices'
    },

    {
      id:4,
      name: 'Studio Leather Tote',
      price: 189,
      category: 'Accessories',
      color: 'Cognac',
      image: '../../images/photo-1594223274512-ad4803739b7c.avif',
      badge: 'ESSENTIAL',
      link: '/prices'
    }

  ];

}