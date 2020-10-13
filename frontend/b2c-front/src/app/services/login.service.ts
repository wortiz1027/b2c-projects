import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



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
        private router: Router) {
        console.log('Users service ready!!');
    }

    userLogin(_body: UserToLoging): Observable<any> {
        console.log('Ingreso al login');
        this.formData.append('client_id', '5258f2f8-05b3-11eb-96f5-9f4a2df3ac0e');
        this.formData.append('client_secret', '9430fd38-05b3-11eb-a999-c7e4bb44a691');
        this.formData.append('scope', 'read write');
        this.formData.append('grant_type', 'password');
        this.formData.append('username', _body.username);
        this.formData.append('password', _body.password);
        return this.httpClient
            .post<any>(`http://localhost:9092/uua/oauth/token`, this.formData);
    }

    setToken(userInformation: ResponseService) {
        this.cookies.set('token', userInformation.access_token);
        this.cookies.set('username', userInformation.username);
    }

    getToken() {
        return this.cookies.get('token');
    }

    getUserName() {
        return this.cookies.get('username');
    }

    userLogout() {
        this.cookies.set('token', '');
        this.cookies.set('username', '');
        this.router.navigateByUrl('/login');
    }

}

export interface UserToLoging {
    grant_type: string;
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    scope: string;
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
