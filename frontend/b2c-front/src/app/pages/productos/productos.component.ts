import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productosResult: Producto[] = [];

  constructor( private _productosService: ProductosService,
               private router: Router,
               private _loginService: LoginService ) { }

  ngOnInit(): void {
    this._productosService.getAllProducts(0, 10).subscribe(
      (res) => {
        this.productosResult = res.products;
        this._loginService.refreshToken();
      },
      (error) => {
        console.log('Error {}', JSON.stringify(error));
        if (error.status === 401) {
          this._loginService.userLogout();
        }
      }
    );
  }

}
