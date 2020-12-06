import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient,
        private _loginService: LoginService) {
        console.log('Users service ready!!');
    }

    httpOptionsWithParams = {
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this._loginService.getToken()
        }),
        params: {}
    };

    createUser(_body: User): Observable<any> {
        console.log('Consume UserService: ', _body);
        _body.codigo = _body.cedula;
        _body.accountNonExpired = 'true';
        _body.credentialNonExpired = 'true';
        _body.accountNonLocket = 'true';
        _body.enable = 'true';
        _body.roles = [
            {
                idRole: 3,
                role: 'ROLE_CLIENT'
            },
            {
                idRole: 5,
                role: 'ROLE_PRODUCTOS_CONSULTA'
            },
            {
                idRole: 7,
                role: 'ROLE_CAMPANAS'
            },
            {
                idRole: 8,
                role: 'ROLE_ORDENES_CONSULTA'
            },
            {
                idRole: 10,
                role: 'ROLE_CLIENTES_CONSULTA'
            }
        ];
        _body.types = {
            type: 2,
            code: 'DRD',
            description: 'Dorado'
        };
        console.log('Consume UserService2: ', _body);

        return this.httpClient
            .post<any>(environment.CREATE_USER_SERVICE, JSON.stringify(_body), this.httpOptions);
    }

    getUserDetailByUsername(username: string): Observable<any> {
        console.log('Ingreso a traer los productos');
        let params = new HttpParams();
        params = params.append('username', username);
        this.httpOptionsWithParams.params = params;
        return this.httpClient
            .get(environment.GET_USER_DETAILS_SERVICE_URL, this.httpOptionsWithParams);
    }

}

export interface User {
    codigo: number;
    cedula: number;
    nombres: string;
    apellidos: string;
    direccion: string;
    fechaNacimiento: Date;
    telefono: string;
    email: string;
    username: string;
    password: string;
    enable: string;
    accountNonExpired: string;
    credentialNonExpired: string;
    accountNonLocket: string;
    roles: Array<RolesUser>;
    types: TypeRole;
}

export interface UserSearch {
    idUser?: number;
    cedula?: number;
    nombre?: string;
    apellido?: string;
    direccion?: string;
    fechaNacimiento?: string;
    telefono?: string;
    email?: string;
    username?: string;
    enable?: string;
    accountNonExpired?: string;
    credentialNonExpired?: string;
    accountNonLocket?: string;
    roles?: Array<RolesUser>;
    types?: TypeRole;
}

export interface RolesUser {
    idRole: number;
    role: string;
}

export interface TypeRole {
    type: number;
    code: string;
    description: string;
}

export interface Status {
    code: string;
    description: string;
}

export interface ResponseServiceCreate {
    status: Status;
    user: User;
}
