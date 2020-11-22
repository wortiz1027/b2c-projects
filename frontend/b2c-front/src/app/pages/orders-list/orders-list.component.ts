import { Component, OnInit } from '@angular/core';
import { OrdersService, OrderSearch } from 'src/app/services/orders.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  public totalItems = 1;
  public totalItemsToShow = 100;
  public totalPages = 0;
  public currentPage = 0;
  public ordersClient: OrderSearch[] = [];

  constructor(private _ordersService: OrdersService,
    private _loginService: LoginService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getOrdersByUser();
  }

  getOrdersByUser() {
    const username = this._loginService.getUserName();
    this._ordersService.getOrdersByUserName(username, this.currentPage, this.totalItemsToShow).subscribe(
      (res) => {
        this.ordersClient = res.data.orders;
        this.totalItems = res.data.totalItems;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
        this._loginService.refreshToken();
      }
    );
  }

  cancelOrderById(order: OrderSearch) {
    this._ordersService.cancelOrderById(order.id).subscribe(
      (res) => {
        console.log('Result: ', res);
        this.getOrdersByUser();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToOrderDetails(order: OrderSearch) {
    this.router.navigate(['/order-detail', order.id]);
  }

}
