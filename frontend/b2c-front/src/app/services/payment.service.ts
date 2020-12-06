import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient,
    private _loginService: LoginService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._loginService.getToken()
    })
  };

  validateCreditCard(creditCard: CreditCardRq) {
    console.log('Ingresó a validar tarjeta');
    const request: RequestCC = {};
    request.creditCard = creditCard;
    return this.httpClient
      .post<any>(environment.PAYMENT_URL, JSON.stringify(request), this.httpOptions);
  }

}

export interface CreditCardRq {
  number?: string;
  type?: string;
  mount?: number;
}

export interface RequestCC {
  creditCard?: CreditCardRq;
}
