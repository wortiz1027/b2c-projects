import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;

  constructor(private router: Router, private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  getDetails() {
    this.router.navigate(['/product-details', this.product.productCode]);
  }

  addToCart() {
    console.log('Cantidad de productos: ', this._shoppingCartService.getTotalProducts());
    this._shoppingCartService.addItemToCart(this.product);
  }

}
