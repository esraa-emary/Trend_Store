import { Routes } from '@angular/router';
import { ManageOrders } from './pages/admin/manage-orders/manage-orders';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Error } from './pages/global/error/error';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ProductDetails } from './pages/user/product-detail/product-detail';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { ProductForm } from './pages/admin/product-form/product-form';
import { UserLayoutComponent } from './layouts/user-layout/user-layout';
import { HomeComponent } from './pages/user/user-home/user-home';
import { ProductsComponent } from './pages/user/products/products';
import { Profile } from './pages/user/profile/profile';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { UserOrders } from './pages/user/user-orders/user-orders';
import { ConfirmEmail } from './pages/auth/confirm-email/confirm-email';
import { ForgetPassword } from './pages/auth/forget-password/forget-password';
import { ResetPassword } from './pages/auth/reset-password/reset-password';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path: '', component: UserLayoutComponent, children: [
            { path: '', redirectTo: "home", pathMatch: "full" },
            { path: 'home', component: HomeComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'profile', component: Profile, canActivate: [authGuard] },
            { path: "my-orders", component: UserOrders, canActivate: [authGuard] },
            { path: 'products/:id', component: ProductDetails },
            { path: 'cart', component: CartComponent, canActivate: [authGuard] },
            { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] }
        ]
    }, {
        path: 'auth', component: AuthLayout, children: [
            { path: '', redirectTo: "signup", pathMatch: "full" },
            { path: "login", component: Login },
            { path: "signup", component: Signup },
            { path: "confirm-email", component: ConfirmEmail },
            { path: "forget-password", component: ForgetPassword },
            { path: "reset-password", component: ResetPassword }
        ]
    },
    {
        path: "admin",
        component: AdminLayout, canActivate: [authGuard, roleGuard], data: { role: 'admin' }, children: [
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