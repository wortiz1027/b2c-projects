import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { ProductsListComponent } from '../../pages/products-list/products-list.component';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';
import { ShoppingCartDetailsComponent } from '../../pages/shopping-cart-details/shopping-cart-details.component';

import { AuthenticationGuard } from '../../guard/authentication.guard';
import { CampaignDetailComponent } from '../../pages/campaign-detail/campaign-detail.component';
import { OrdersListComponent } from 'src/app/pages/orders-list/orders-list.component';
import { OrderDetailsComponent } from 'src/app/pages/order-details/order-details.component';
import { PaymentComponent } from 'src/app/pages/payment/payment.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthenticationGuard] },
    { path: 'products-list',      component: ProductsListComponent },
    { path: 'product-details/:productId',      component: ProductDetailsComponent },
    { path: 'shopping-cart-details',      component: ShoppingCartDetailsComponent },
    { path: 'campaign-detail/:campaignId/:discount',      component: CampaignDetailComponent },
    { path: 'orders',      component: OrdersListComponent },
    { path: 'order-detail/:orderId',      component: OrderDetailsComponent },
    { path: 'payment/:orderId/:total',      component: PaymentComponent }
];
