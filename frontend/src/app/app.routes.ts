import { Routes } from '@angular/router';
import { ManageOrders } from './pages/admin/manage-orders/manage-orders';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Error } from './pages/global/error/error';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Profile } from './pages/user/profile/profile';
import { Login } from './pages/user/login/login';
import { Signup } from './pages/user/signup/signup';
import { ConfirmEmail } from './pages/user/confirm-email/confirm-email';
import { UserOrders } from './pages/user/user-orders/user-orders';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { Shop } from './pages/shop/shop';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
    {
        path: "",
        component: MainLayout,
        children: [
            { path: "", redirectTo: "signup", pathMatch: "full" },
            { path: "shop", component: Shop },
            { path: "login", component: Login },
            { path: "signup", component: Signup },
            { path: "confirm-email", component: ConfirmEmail },
            { path: "profile", component: Profile, canActivate: [authGuard] },
            { path: "my-orders", component: UserOrders, canActivate: [authGuard] },
            { path: "cart", component: CartComponent, canActivate: [authGuard] },
            { path: "checkout", component: CheckoutComponent, canActivate: [authGuard] }
        ]
    },
    {
        path: "admin",
        component: AdminLayout,
        canActivate: [authGuard],
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", component: Dashboard },
            { path: "orders", component: ManageOrders },
            { path: "products", component: ManageProducts },
            { path: "users", component: ManageUsers }
        ]
    },
    { path: "**", component: Error }
];
