import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public productosResult = [];
  public totalItems = 1;
  public totalItemsToShow = 10;
  public totalPages = 0;
  public currentPage = 0;

  constructor(private _productosService: ProductosService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this.getProductsWithPage();
  }

  onDataChange(event: any) {
    this.currentPage = event - 1;
    this.getProductsWithPage();
  }

  getProductsWithPage() {
    this._productosService.getAllProducts(this.currentPage, this.totalItemsToShow).subscribe(
      (res) => {
        this.productosResult = res.data.products;
        this.totalItems = res.data.totalItems;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
        this._loginService.refreshToken();
      },
      (error) => {
        console.log('Error {}', JSON.stringify(error));
      }
    );
  }

}
