import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductosService {

    private productos: Producto[];
    private formData = new FormData();

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
            .get(environment.GET_ALL_PRODUCTS_SERVICE_URL, this.httpOptionsWithParams);
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
            .get(environment.GET_PRODUCT_DETAILS_SERVICE_URL, this.httpOptionsWithParams);
    }

    getProductosByText(textSearch: string, pageNumber: number, productsPerPage: number): Observable<any> {
        console.log('Ingreso a traer productos por Texto: ', textSearch);
        let params = new HttpParams();
        params = params.append('page', pageNumber.toString());
        params = params.append('size', productsPerPage.toString());
        this.httpOptionsWithParams.params = params;
        this.formData.delete('text');
        this.formData.append('text', textSearch);
        return this.httpClient
            .post(environment.GET_PRODUCTS_BY_TEXT_SERVICE_URL, this.formData, this.httpOptionsWithParams);
    }

    getProductsByCampaign(campaignId: string, pageNumber: number, productsPerPage: number): Observable<any> {
        console.log('Ingreso a traer el productos por campaña');
        let params = new HttpParams();
        params = params.append('page', pageNumber.toString());
        params = params.append('size', productsPerPage.toString());
        this.httpOptionsWithParams.params = params;
        return this.httpClient
            .get(environment.CAMPAINS_SERVICE_URL + '/' + campaignId + `/products`, this.httpOptionsWithParams);
    }
}

export interface Producto {
    productId?: string;
    productCode?: string;
    productName?: string;
    productDescription?: string;
    startDate?: Date;
    endDate?: Date;
    type?: ProductType;
    productPrice?: number;
    originCity?: string;
    destinationCity?: string;
    image?: Image;
    vendorId?: string;
    status?: string;
    quantity?: number;
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
