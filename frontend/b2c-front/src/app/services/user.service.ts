import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

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
            .post<any>(`http://localhost:9092/registry/users`, JSON.stringify(_body), this.httpOptions);
    }

    getUserDetailByUsername(username: string): Observable<any> {
        console.log('Ingreso a traer los productos');
        let params = new HttpParams();
        params = params.append('username', username);
        this.httpOptionsWithParams.params = params;
        return this.httpClient
            .get(`http://localhost:9092/security/users/detail`, this.httpOptionsWithParams);
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


/* "codigo" : "971f5168-cd7e-40d3-84e1-817956856eaa",
	"cedula" : 98745632,
	"nombres" : "Carlos Andres",
	"apellidos" : "Perez Ramos",
	"direccion" : "Cra 107 # 124B - 2",
	"fechaNacimiento" : "2001-01-01",
	"telefono" : "9874562545",
	"email" : "cperez@outlook.com",
	"username" : "cperez",
	"password" : "Octubre2020**",
	"enable" : "true",
	"accountNonExpired" : "true",
	"credentialNonExpired" : "true",
	"accountNonLocket" : "true",
	"roles" : [
		{
			"ROLE_CLIENT" : "618bdc1e-05b2-11eb-acd0-67a7ef0f42bc"
		}
    ]
*/

/*
private userTest: any = {
        code: "971f5168-cd7e-40d3-84e1-817956856eaa",
        identificationNumber: 10101010,
        firstName: "Carlos Andres",
        lastName: "Perez Ramos",
        address: "Cra 107 # 124B - 2",
        birthday: new Date(),
        phoneNumber: "9874562545",
        email: "bsuarez@outlook.com",
        username: "bsuarez",
        password: "Octubre2020**",
        enable: "true",
        accountNonExpired: "true",
        credentialNonExpired: "true",
        accountNonLocket: "true",
        roles: [
            {
                ROLE_CLIENT: "618bdc1e-05b2-11eb-acd0-67a7ef0f42bc"
            }
        ]
    };

const body = new HttpParams()
            .set('code', this.userTest.code)
            .set('identificationNumber', this.userTest.identificationNumber.toString())
            .set('firstName', this.userTest.firstName)
            .set('lastName', this.userTest.lastName)
            .set('address', this.userTest.address)
            .set('birthday', this.userTest.birthday.toString())
            .set('phoneNumber', this.userTest.phoneNumber)
            .set('email', this.userTest.email)
            .set('username', this.userTest.username)
            .set('password', this.userTest.password)
            .set('enable', this.userTest.enable)
            .set('accountNonExpired', this.userTest.accountNonExpired)
            .set('credentialNonExpired', this.userTest.credentialNonExpired)
            .set('accountNonLocket', this.userTest.accountNonLocket)
            .set('roles.ROLE_CLIENT', this.userTest.roles.ROLE_CLIENT);

private userTest: User = {
        codigo: '971f5168-cd7e-40d3-84r1-817966856eaa',
        cedula: 9797979,
        nombres: 'CXXXX',
        apellidos: 'PDDDD',
        direccion: 'Cra 107 # 124B - 2',
        fechaNacimiento: new Date(),
        telefono: '4554545454',
        email: 'qqqqqqq@outlook.com',
        username: 'qqqqqqq',
        password: 'Octubre2020**',
        enable: 'true',
        accountNonExpired: 'true',
        credentialNonExpired: 'true',
        accountNonLocket: 'true',
        roles: [
            {
                ROLE_CLIENT: "618bdc1e-05b2-11eb-acd0-67a7ef0f42bc"
            }
        ]
    };
*/
