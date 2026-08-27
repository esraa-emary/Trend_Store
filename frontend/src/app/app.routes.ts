import { Routes } from '@angular/router';
import { ManageOrders } from './pages/admin/manage-orders/manage-orders';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Error } from './pages/global/error/error';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ProductDetails } from './pages/product-detail/product-detail';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { ProductForm } from './pages/admin/product-form/product-form';
import { UserLayoutComponent } from './layouts/user-layout/user-layout';
import { HomeComponent } from './pages/user/user-home/user-home';
import { ProductsComponent } from './pages/user/products/products';

export const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,

        children: [
            { path: '', redirectTo: "home", pathMatch: "full" },
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductsComponent }

        ]
    },

    { path: '', component: ProductDetails },
    { path: 'products/:id', component: ProductDetails },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    {
        path: "admin",
        component: AdminLayout,
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", component: Dashboard },
            { path: "orders", component: ManageOrders },
            { path: "products", component: ManageProducts },
            { path: "users", component: ManageUsers },
            { path: 'products/:id', component: ProductDetails },
            { path: 'products', component: ManageProducts },
            { path: 'product-form', component: ProductForm },
        ]
    },
    { path: "**", component: Error }
];