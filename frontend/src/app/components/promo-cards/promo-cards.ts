import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PromoCard {
  theme: 'light' | 'dark';
  image?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: string;
  link?: string;
}

@Component({
  selector: 'app-promo-cards',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './promo-cards.html',
  styleUrl: './promo-cards.css'
})
export class PromoCardsComponent {

  promoCards: PromoCard[] = [
    {
      theme: 'light',
      image: '../../images/photo-1490481651871-ab68de25d43d.avif'
    },
    {
      theme: 'dark',
      eyebrow: 'ACCESSORIES',
      title: 'The finishing touch.',
      description:
        'Considered details to complete your everyday wardrobe.',
      cta: 'SHOP ACCESSORIES',
      link: '/products'
    }
  ];

}
