import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';



@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html'
})
export class BuscarProductosComponent implements OnInit {

  productos: any[] = [];
  keyWord: string;
  constructor(private activatedRoute: ActivatedRoute,
              private _productosService: ProductosService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.keyWord = params['keyWord'];
      this.productos = this._productosService.searchProducts(this.keyWord);
      console.log(this.productos);
    });
  }

}
