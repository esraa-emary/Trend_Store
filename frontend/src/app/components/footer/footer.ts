import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  route: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {

  footerColumns: FooterColumn[] = [
    {
      title: 'SHOP',
      links: [
        {
          label: 'Shop all',
          route: '/products'
        },
        {
          label: 'New in',
          route: '/products'
        },
        {
          label: 'Clothing',
          route: '/products'
        },
        {
          label: 'Accessories',
          route: '/products'
        }
      ]
    },
    {
      title: 'ABOUT',
      links: [
        {
          label: 'Our story',
          route: '/about'
        },
        {
          label: 'Journal',
          route: '/journal'
        },
        {
          label: 'Contact',
          route: '/contact'
        },
        {
          label: 'FAQ',
          route: '/faq'
        }
      ]
    },
    {
      title: 'HELP',
      links: [
        {
          label: 'Shipping & returns',
          route: '/shipping-returns'
        },
        {
          label: 'Size guide',
          route: '/size-guide'
        },
        {
          label: 'Privacy',
          route: '/privacy'
        },
        {
          label: 'Terms',
          route: '/terms'
        }
      ]
    }
  ];

}
