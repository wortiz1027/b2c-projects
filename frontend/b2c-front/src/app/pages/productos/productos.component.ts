import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productosResult: Producto[] = [];

  constructor( private _productosService: ProductosService,
               private router: Router ) { }

  ngOnInit(): void {
    this.productosResult = this._productosService.getProductos();
  }

}
