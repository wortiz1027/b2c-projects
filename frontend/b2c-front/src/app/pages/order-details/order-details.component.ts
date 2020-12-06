import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService, OrderSearch } from 'src/app/services/orders.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  public order: OrderSearch = {};

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _ordersService: OrdersService,
    private _loginService: LoginService) {
      this.activatedRoute.params.subscribe(params => {
        const orderId = params['orderId'];
        this.getDetail(orderId);
      });
    }

  ngOnInit(): void {
  }

  getDetail(orderId: string) {
    this._ordersService.getOrderDetails(orderId).subscribe(
      (res) => {
        this.order = res.order;
      },
      (error) => {
        console.error('Error ', error);
        if (error.status === 401) {
          this._loginService.userLogout();
        }
      }
    );
  }

  ordersReturn() {
    this.router.navigate(['/orders']);
  }

}
