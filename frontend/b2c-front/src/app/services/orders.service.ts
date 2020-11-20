import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { UUID } from 'angular2-uuid';

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

  createOrder(order: OrderCreate) {
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
      .post<any>(`http://localhost:9092/orders/cmd`, JSON.stringify(order), this.httpOptions);
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

export interface Customer {
  id?: string;
}

export interface ProductOrder {
  id?: string;
  code?: string;
  price?: number;
}

export interface Payment {
  id: string;
}
