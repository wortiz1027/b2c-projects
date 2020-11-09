import { Component, OnInit } from '@angular/core';
import { ShoppingCartService, ProductCart } from '../../services/shopping-cart.service';
import { Producto, ProductosService } from '../../services/productos.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.css']
})
export class ShoppingCartDetailsComponent implements OnInit {

  public products: ProductCart[];
  public productsToShow: Producto[];
  constructor(private _shoppingCartService: ShoppingCartService,
    private _productosService: ProductosService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    console.log('products total: ', this._shoppingCartService.getTotalProducts());
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
            this.productsToShow.push(productDetail);
            this._loginService.refreshToken();
          },
          (error) => {
            console.error('Error trayendo el detalle: ', error);
          }
        );
      }
    }
  }

}
