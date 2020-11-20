import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AutguardService } from './services/autguard-service.service';
import { LoginService } from './services/login.service';
import { ProductCardComponent } from './pages/product-card/product-card.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { MatCardModule } from '@angular/material/card';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCartDetailsComponent } from './pages/shopping-cart-details/shopping-cart-details.component';
import { ProductCardCartComponent } from './pages/product-card-cart/product-card-cart.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { CampaignDetailComponent } from './pages/campaign-detail/campaign-detail.component';
import { ProductCartCampaignComponent } from './pages/product-cart-campaign/product-cart-campaign.component';
import { OrdersService } from './services/orders.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    JwPaginationModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    ShoppingCartDetailsComponent,
    ProductCardCartComponent,
    CampaignDetailComponent,
    ProductCartCampaignComponent
  ],
  providers: [
    AutguardService,
    LoginService,
    ShoppingCartService,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
