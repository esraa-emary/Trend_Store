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
import { ProductListComponent } from './pages/admin/product-list/product-lists';
import { ProductForm } from './pages/admin/product-form/product-form';

export const routes: Routes = [
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
                { path: 'product-list', component: ProductListComponent },
                { path: 'product-form', component: ProductForm },
        ]
    },
    { path: "**", component: Error }
];