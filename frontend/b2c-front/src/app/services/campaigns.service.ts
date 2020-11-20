import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';

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
    console.log('Ingreso a traer los productos');
    let params = new HttpParams();
    params = params.append('page', '0');
    params = params.append('size', '100');
    this.httpOptionsWithParams.params = params;
    return this.httpClient
      .get(`http://localhost:9092/campaigns/qrs`, this.httpOptionsWithParams);
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


/*
{
        "campaignId": "3c58ab61-f679-4c2e-a21e-b17599b46427",
        "campaignCode": "CP_0001",
        "campaignName": "Dia del padre",
        "campaignDescription": "tiquetes y hospedaje con el 15% de descuento",
        "image": {
            "id": "51104744-8104-44ce-a6eb-3c99256d242f",
            "url": ""
        },
        "startDate": "2020-11-11",
        "endDate": "2020-11-15",
        "discount": 15,
        "status": "ACTIVE",
        "action": ""
    }
}
*/
