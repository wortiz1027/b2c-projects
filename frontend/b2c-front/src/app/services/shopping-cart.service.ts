import { Injectable } from '@angular/core';
import { Producto } from '../services/productos.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  public shoppingCart: ProductCart[];

  constructor() { }

  addItemToCart(product: Producto) {
    console.log('Ingresó a agregar producto');
    const productToAdd: ProductCart = {
      productId: product.productId,
      productCode: product.productCode,
      productName: product.productName,
      productDescription: product.productDescription
    };
    if (localStorage.getItem('shoppingCart') === '' || localStorage.getItem('shoppingCart') === null) {
      this.shoppingCart = [];
    } else {
      console.log('carrito de compras: ', JSON.parse(localStorage.getItem('shoppingCart')));
      this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    this.shoppingCart.push(productToAdd);
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  clearCart() {
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    this.shoppingCart = [];
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  getTotalProducts(): number {
    let cant = 0;
    if (localStorage.getItem('shoppingCart') === '' || localStorage.getItem('shoppingCart') === null) {
      console.log('cant1: ', cant);
      return cant;
    }
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    cant = this.shoppingCart.length;
    console.log('cant2: ', cant);
    return cant;
  }

  deleteItem(productToDelete: Producto) {
    this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    for (let i = 0; i < this.shoppingCart.length; i++) {
      if (this.shoppingCart[i].productCode = productToDelete.productCode) {
        this.shoppingCart.splice(i, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
        return;
      }
    }
  }

  getAllProducts(): ProductCart[] {
    if (localStorage.getItem('shoppingCart') === '' || localStorage.getItem('shoppingCart') === null) {
      this.shoppingCart = [];
    } else {
      this.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    }

    return this.shoppingCart;
  }

}

export interface ProductCart {
  productId: string;
  productCode: string;
  productName: string;
  productDescription: string;
}
