import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: any;
  public productId: string;
  public yaExiste: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private _productosServices: ProductosService,
    private _shoppingCartService: ShoppingCartService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this.yaExiste = true;
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['productId'];
      this._productosServices.getProduct(this.productId).subscribe(
        (res) => {
          this.product = res.product;
          this._loginService.refreshToken();
        },
        (error) => {
          console.log('Error: ', error);
          if (error.status === 401) {
            this._loginService.userLogout();
          }
        }
      );
    });
  }

  addToCart() {
    this._shoppingCartService.addItemToCart(this.product);
  }

}
