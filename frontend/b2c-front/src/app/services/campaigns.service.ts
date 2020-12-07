import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CampaignsService {

  constructor(private httpClient: HttpClient,
    private _loginService: LoginService) { }

  httpOptionsWithParams = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this._loginService.getToken()
    }),
    params: {}
  };

  getAllCampaigns(): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', '0');
    params = params.append('size', '100');
    this.httpOptionsWithParams.params = params;
    return this.httpClient
      .get(environment.CAMPAINS_SERVICE_URL, this.httpOptionsWithParams);
  }

}

export interface Campaign {
  campaignId?: string;
  campaignCode?: string;
  campaignName?: string;
  campaignDescription?: string;
  image?: Image;
  startDate?: string;
  endDate?: string;
  discount?: string;
  status?: string;
  action?: string;
}

export interface Image {
  id: string;
  url: string;
}
