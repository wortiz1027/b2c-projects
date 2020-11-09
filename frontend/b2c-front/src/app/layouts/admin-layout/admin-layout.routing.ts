import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';
import { ShoppingCartDetailsComponent } from '../../pages/shopping-cart-details/shopping-cart-details.component';

import { AuthenticationGuard } from '../../guard/authentication.guard';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthenticationGuard] },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'products-list',      component: ProductsListComponent },
    { path: 'product-details/:productId',      component: ProductDetailsComponent },
    { path: 'shopping-cart-details',      component: ShoppingCartDetailsComponent }
];
