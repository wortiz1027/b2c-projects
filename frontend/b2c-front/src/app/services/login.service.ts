import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ShoppingCartService } from './shopping-cart.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        })
    };
    responseService: ResponseService;

    formData = new FormData();

    constructor(private httpClient: HttpClient,
        private cookies: CookieService,
        private router: Router,
        private _shoppingCartService: ShoppingCartService) {
    }

    userLogin(_body: UserToLoging): Observable<any> {
        this._shoppingCartService.clearCart();
        this.formData.append('client_id', '89792737-705f-4358-a95b-744962644de4');
        this.formData.append('client_secret', '0b78c28e-6abc-4252-85d1-214da95bc6ca');
        this.formData.append('scope', 'read write');
        this.formData.append('grant_type', 'password');
        this.formData.append('username', _body.username);
        this.formData.append('password', _body.password);
        return this.httpClient
            .post<any>(environment.LOGIN_SERVICE_URL, this.formData);
    }

    setToken(userInformation: ResponseService) {
        this.cookies.set('token', userInformation.access_token);
        this.cookies.set('refreshToken', userInformation.refresh_token);
    }

    setUserInformation(username: string) {
        this.cookies.set('username', username);
    }

    setUserDetails(identification: string) {
        this.cookies.set('identificationType', 'CC');
        this.cookies.set('identification', identification);
    }

    getIdentificationUser() {
        return this.cookies.get('identification');
    }

    getToken() {
        return this.cookies.get('token');
    }

    getRefreshToken() {
        return this.cookies.get('refreshToken');
    }

    getUserName() {
        let username = '';
        username = this.cookies.get('username');
        return username;
    }

    userLogout() {
        this._shoppingCartService.clearCart();
        this.cookies.deleteAll();
        this.router.navigate(['/login']);
    }

    refreshToken() {
        this.formData.append('client_id', '89792737-705f-4358-a95b-744962644de4');
        this.formData.append('client_secret', '0b78c28e-6abc-4252-85d1-214da95bc6ca');
        this.formData.append('grant_type', 'refresh_token');
        this.formData.append('refresh_token', this.getRefreshToken());
        this.httpClient
            .post<any>(environment.LOGIN_SERVICE_URL, this.formData).subscribe(
                (resRefresh) => {
                    this.responseService = resRefresh;
                    this.setToken(this.responseService);
                },
                (error) => {
                    console.log('Error {}', error);
                    if (error.status === 401) {
                        this.userLogout();
                      }
                }
            );
    }

}

export interface UserToLoging {
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
    username?: string;
    password?: string;
    scope?: string;
}

export interface ResponseService {
    access_token: string;
    expires_in: string;
    jti: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    username: string;
}
