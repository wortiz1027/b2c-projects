import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrdersService {

  constructor(private httpClient: HttpClient,
    private _loginService: LoginService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._loginService.getToken()
    })
  };

  httpOptionsWithParams = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this._loginService.getToken()
    }),
    params: {}
  };

  createOrder(order: OrderCreate): Observable<any> {
    console.log('Ingreso a crear orden');
    const codeUuid = UUID.UUID();
    const payment: Payment = {
      id: codeUuid
    };
    order.id = codeUuid;
    order.code = codeUuid;
    order.payment = payment;
    console.log('Rq Orders: ', JSON.stringify(order));
    return this.httpClient
      .post<any>(environment.COMMAND_ORDERS_SERVICE_URL, JSON.stringify(order), this.httpOptions);
  }

  getOrdersByUserName(username: string, pageNumber: number, ordersPerPage: number): Observable<any> {
    console.log('Ingreso a traer los productos');
    let params = new HttpParams();
    params = params.append('page', pageNumber.toString());
    params = params.append('size', ordersPerPage.toString());
    this.httpOptionsWithParams.params = params;
    return this.httpClient
      .get(environment.GET_ORDERS_BY_USER_URL + username, this.httpOptionsWithParams);
  }

  cancelOrderById(orderId: string): Observable<any> {
    console.log('Ingreso a cancelar orden');
    return this.httpClient
      .put(environment.COMMAND_ORDERS_SERVICE_URL + '/' + orderId, '', this.httpOptions);
  }

  getOrderDetails(orderId: string): Observable<any> {
    console.log('Ingreso a traer el detalle de la orden');
    return this.httpClient
      .get(environment.GET_ORDER_DETAILS_URL + orderId, this.httpOptionsWithParams);
  }

}

export interface OrderCreate {
  id?: string;
  code?: string;
  creationDate?: string;
  customer?: Customer;
  products?: ProductOrder[];
  payment?: Payment;
}

export interface OrderSearch {
  id?: string;
  code?: string;
  creationDate?: string;
  customer?: Customer;
  products?: ProductOrder[];
  payment?: Payment;
  state?: State;
  total?: number;
}

export interface Customer {
  id?: string;
}

export interface ProductOrder {
  id?: string;
  code?: string;
  price?: number;
  quantity?: number;
}

export interface Payment {
  id: string;
}

export interface State {
  value: string;
}
