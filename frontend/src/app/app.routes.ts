import { Routes } from '@angular/router';

import { UserLayoutComponent } from './layouts/user-layout/user-layout';
import { HomeComponent } from './pages/user/user-home';

import { ProductDetails } from './pages/product-detail/product-detail';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';

import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { ManageOrders } from './pages/admin/manage-orders/manage-orders';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { ProductForm } from './pages/admin/product-form/product-form';

import { Error } from './pages/global/error/error';

export const routes: Routes = [
  // User
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },

  // Products
  {
    path: 'products/:id',
    component: ProductDetails,
  },

  // Cart
  {
    path: 'cart',
    component: CartComponent,
  },

  // Checkout
  {
    path: 'checkout',
    component: CheckoutComponent,
  },

  // Admin
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'orders',
        component: ManageOrders,
      },
      {
        path: 'products',
        component: ManageProducts,
      },
      {
        path: 'users',
        component: ManageUsers,
      },
      {
        path: 'product-form',
        component: ProductForm,
      },
      {
        path: 'products/:id',
        component: ProductDetails,
      },
    ],
  },

  // Error
  {
    path: '**',
    component: Error,
  },
];
