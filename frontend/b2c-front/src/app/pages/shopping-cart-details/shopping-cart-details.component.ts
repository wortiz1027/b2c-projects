import { Component, OnInit } from '@angular/core';
import { ShoppingCartService, ProductCart } from '../../services/shopping-cart.service';
import { Producto, ProductosService } from '../../services/productos.service';
import { LoginService } from '../../services/login.service';
import { OrdersService, OrderCreate, ProductOrder } from 'src/app/services/orders.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.css']
})
export class ShoppingCartDetailsComponent implements OnInit {

  public products: ProductCart[];
  public productsToShow: Producto[];
  public order: OrderCreate = {};
  public total = 0;

  constructor(private _shoppingCartService: ShoppingCartService,
    private _productosService: ProductosService,
    private _loginService: LoginService,
    private _ordersService: OrdersService,
    private router: Router) { }

  ngOnInit(): void {
    this.productsToShow = [];
    this.products = this._shoppingCartService.getAllProducts();
    if (this.products.length === 0) {
      console.log('No tiene productos agregados');
    } else {
      for (const product of this.products) {

        this._productosService.getProduct(product.productCode).subscribe(
          (res) => {
            let productDetail: Producto;
            productDetail = res.product;
            productDetail.productPrice = product.productPrice;
            productDetail.quantity = product.productQuantity;
            this.productsToShow.push(productDetail);
            this._loginService.refreshToken();
          },
          (error) => {
            console.error('Error trayendo el detalle: ', error);
            if (error.status === 401) {
              this._loginService.userLogout();
            }
          }
        );
      }
    }
  }

  getTotalPrice(): number {
    let total = 0;
    if (this.products.length === 0) {
      console.log('No tiene productos agregados');
    } else {
      for (const product of this.products) {
        total += product.productPrice;
      }
    }
    return total;
  }

  createOrder() {
    const fechaCreacion = new Date();
    this.order = {};
    this.order.products = [];
    this.order.creationDate = formatDate(fechaCreacion, 'yyyy-MM-dd', 'en-US');
    this.order.customer = {};
    this.order.customer.id = this._loginService.getUserName();
    for (const product of this.productsToShow) {
      const productToPush: ProductOrder = {};
      productToPush.code = product.productCode;
      productToPush.id = product.productId;
      productToPush.price = product.productPrice;
      productToPush.quantity = product.quantity;
      this.total += product.productPrice;
      this.order.products.push(productToPush);
    }
    this._ordersService.createOrder(this.order).subscribe(
      (res) => {
        this.router.navigate(['/payment', this.order.id, this.total]);
      },
      (error) => {
        console.log('Error en la compra ', JSON.stringify(error));
        if (error.status === 401) {
          this._loginService.userLogout();
        }
      }
    );
  }

}
