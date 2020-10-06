import { Injectable } from '@angular/core';

@Injectable()
export class ProductosService {

    private productos: Producto [] = [
        {
            nombre: "Panamá",
            descripcion: "Viaje a Panamá",
            precio: 1000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Brasil",
            descripcion: "Viaje a Brasil",
            precio: 2000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Perú",
            descripcion: "Viaje a Perú",
            precio: 3000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Panamá",
            descripcion: "Viaje a Panamá",
            precio: 1000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Brasil",
            descripcion: "Viaje a Brasil",
            precio: 2000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Perú",
            descripcion: "Viaje a Perú",
            precio: 3000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Panamá",
            descripcion: "Viaje a Panamá",
            precio: 1000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Brasil",
            descripcion: "Viaje a Brasil",
            precio: 2000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Perú",
            descripcion: "Viaje a Perú",
            precio: 3000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Panamá",
            descripcion: "Viaje a Panamá",
            precio: 1000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Brasil",
            descripcion: "Viaje a Brasil",
            precio: 2000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        },
        {
            nombre: "Perú",
            descripcion: "Viaje a Perú",
            precio: 3000000,
            tipo: "pasajes",
            proveedor: "Avianca"
        }
    ];

    constructor() {
        console.log("Servicio listo para usar");
    }

    getProductos() {
        return this.productos;
    }

    searchProducts( keyWord: string ): Producto[] {
        let productsArr: Producto[] = [];
        keyWord = keyWord.toLowerCase();
        for (const productSearched of this.productos) {

            let nombre = productSearched.nombre.toLowerCase();
            if ( nombre.indexOf(keyWord) >= 0 ) {
                productsArr.push(productSearched);
            }
        }
        console.log(productsArr);
        return productsArr;
    }
}

export interface Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    tipo: string;
    proveedor: string;
}
