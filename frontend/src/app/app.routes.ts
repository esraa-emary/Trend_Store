import { Routes } from '@angular/router';
import { ManageOrders } from './pages/admin/manage-orders/manage-orders';
import { ManageProducts } from './pages/admin/manage-products/manage-products';
import { ManageUsers } from './pages/admin/manage-users/manage-users';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Error } from './pages/global/error/error';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
    {
        path: "admin",
        component: AdminLayout,
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "dashboard", component: Dashboard },
            { path: "orders", component: ManageOrders },
            { path: "products", component: ManageProducts },
            { path: "users", component: ManageUsers },
        ]
    },
    { path: "**", component: Error }
];