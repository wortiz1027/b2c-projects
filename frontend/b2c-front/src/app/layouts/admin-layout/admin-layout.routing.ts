import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';
import { ShoppingCartDetailsComponent } from '../../pages/shopping-cart-details/shopping-cart-details.component';

import { AuthenticationGuard } from '../../guard/authentication.guard';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthenticationGuard] },
    { path: 'products-list',      component: ProductsListComponent },
    { path: 'product-details/:productId',      component: ProductDetailsComponent },
    { path: 'shopping-cart-details',      component: ShoppingCartDetailsComponent }
];
