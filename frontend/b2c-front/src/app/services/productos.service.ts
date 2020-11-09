import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class ProductosService {

    private productos: Producto[];

    constructor(private httpClient: HttpClient,
        private _loginService: LoginService) {
        console.log('Servicio listo para usar');
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this._loginService.getToken()
        })
    };

    httpOptionsWithParams = {
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this._loginService.getToken()
        }),
        params: {}
    };

    getAllProducts(pageNumber: number, productsPerPage: number): Observable<any> {
        console.log('Ingreso a traer los productos');
        let params = new HttpParams();
        params = params.append('page', pageNumber.toString());
        params = params.append('size', productsPerPage.toString());
        this.httpOptionsWithParams.params = params;
        return this.httpClient
            .get(`http://localhost:9092/products/qrs`, this.httpOptionsWithParams);
    }

    searchProducts(keyWord: string): Producto[] {
        const productsArr: Producto[] = [];
        keyWord = keyWord.toLowerCase();
        for (const productSearched of this.productos) {

            const nombre = productSearched.productDescription.toLowerCase();
            if (nombre.indexOf(keyWord) >= 0) {
                productsArr.push(productSearched);
            }
        }
        console.log(productsArr);
        return productsArr;
    }

    getProduct(idProduct: string): Observable<any> {
        console.log('Ingreso a traer el detalle del producto');
        let params = new HttpParams();
        params = params.append('code', idProduct);
        this.httpOptionsWithParams.params = params;
        return this.httpClient
            .get(`http://localhost:9092/products/qrs/details`, this.httpOptionsWithParams);
    }
}

export interface Producto {
    productId: string;
    productCode: string;
    productName: string;
    productDescription: string;
    startDate: Date;
    endDate: Date;
    type: ProductType;
    productPrice: number;
    originCity: string;
    destinationCity: string;
    image: Image;
    vendorId: string;
    status?: string;
}

export interface ProductType {
    id: string;
    description: string;
    status?: string;
}

export interface Image {
    id: string;
    url: string;
}


/*
 = [
        {
            productId: '121321321',
            productCode: '1',
            productName: 'Producto 1',
            productDescription: 'Esta es la descripción del producto',
            startDate: new Date(),
            endDate: new Date(),
            type: {
                id: '12312-edasd',
                description: 'Vuelo',
                status: 'OK'
            },
            productPrice: 1231321,
            originCity: 'Bogotá',
            destinationCity: 'Lima',
            image: {
                id: 'asdasd',
                url: '/assets/img/theme/sketch.jpg'
            },
            vendorId: 'sdasdasd',
            status: 'OK'
        },
        {
            productId: '121321321',
            productCode: '2',
            productName: 'Producto 2',
            productDescription: 'Esta es la descripción del producto',
            startDate: new Date(),
            endDate: new Date(),
            type: {
                id: '12312-edasd',
                description: 'Vuelo',
                status: 'OK'
            },
            productPrice: 1231321,
            originCity: 'Bogotá',
            destinationCity: 'Lima',
            image: {
                id: 'asdasd',
                url: '/assets/img/theme/sketch.jpg'
            },
            vendorId: 'sdasdasd',
            status: 'OK'
        },
        {
            productId: '121321321',
            productCode: '3',
            productName: 'Producto 3',
            productDescription: 'Esta es la descripción del producto',
            startDate: new Date(),
            endDate: new Date(),
            type: {
                id: '12312-edasd',
                description: 'Vuelo',
                status: 'OK'
            },
            productPrice: 1231321,
            originCity: 'Bogotá',
            destinationCity: 'Lima',
            image: {
                id: 'asdasd',
                url: '/assets/img/theme/sketch.jpg'
            },
            vendorId: 'sdasdasd',
            status: 'OK'
        },
        {
            productId: '121321321',
            productCode: '4',
            productName: 'Producto 4',
            productDescription: 'Esta es la descripción del producto',
            startDate: new Date(),
            endDate: new Date(),
            type: {
                id: '12312-edasd',
                description: 'Vuelo',
                status: 'OK'
            },
            productPrice: 1231321,
            originCity: 'Bogotá',
            destinationCity: 'Lima',
            image: {
                id: 'asdasd',
                url: '/assets/img/theme/sketch.jpg'
            },
            vendorId: 'sdasdasd',
            status: 'OK'
        },
        {
            productId: '121321321',
            productCode: '5',
            productName: 'Producto 2',
            productDescription: 'Esta es la descripción del producto',
            startDate: new Date(),
            endDate: new Date(),
            type: {
                id: '12312-edasd',
                description: 'Vuelo',
                status: 'OK'
            },
            productPrice: 1231321,
            originCity: 'Bogotá',
            destinationCity: 'Lima',
            image: {
                id: 'asdasd',
                url: '/assets/img/theme/sketch.jpg'
            },
            vendorId: 'sdasdasd',
            status: 'OK'
        },
        {
            productId: '121321321',
            productCode: '6',
            productName: 'Producto 6',
            productDescription: 'Esta es la descripción del producto',
            startDate: new Date(),
            endDate: new Date(),
            type: {
                id: '12312-edasd',
                description: 'Vuelo',
                status: 'OK'
            },
            productPrice: 1231321,
            originCity: 'Bogotá',
            destinationCity: 'Lima',
            image: {
                id: 'asdasd',
                url: '/assets/img/theme/sketch.jpg'
            },
            vendorId: 'sdasdasd',
            status: 'OK'
        }
    ];
*/
