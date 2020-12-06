import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BpmService {

  constructor(private httpClient: HttpClient,
    private _loginService: LoginService) {
    console.log('Cancel Order BPM service ready!!');
  }

  httpOptions = {
    headers: new HttpHeaders(),
    body: {}
  };

  cancelOrderBPM(idOrden: string): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this._loginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    const requestCancel: any = {};
    requestCancel.numeroSolicitud = idOrden;

    this.httpOptions.headers = headers;

    const result = this.httpClient
      .post<any>(environment.CANCEL_ORDER_BPM, JSON.stringify(requestCancel), this.httpOptions);

    return result;
  }

  instanceOrderBPM(idOrden: string): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this._loginService.getToken().valueOf());
    headers = headers.append('Content-Type', 'application/json');

    const requestInstance: any = {};
    requestInstance.numeroSolicitud = idOrden;

    this.httpOptions.headers = headers;

    const result = this.httpClient
      .post<any>(environment.INSTANCE_ORDER_BPM, JSON.stringify(requestInstance), this.httpOptions);

    return result;
  }

}
