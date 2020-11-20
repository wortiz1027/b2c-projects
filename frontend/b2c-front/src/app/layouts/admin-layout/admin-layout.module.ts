import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

// Services
import { ProductosService } from '../../services/productos.service';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { CampaignsService } from '../../services/campaigns.service';


// Components
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductosComponent } from '../../pages/productos/productos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    ProductosComponent
  ],
  providers: [
    ProductosService,
    UserService,
    LoginService,
    CampaignsService
  ]
})

export class AdminLayoutModule {}
