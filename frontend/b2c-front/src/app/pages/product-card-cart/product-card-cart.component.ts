import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card-cart',
  templateUrl: './product-card-cart.component.html',
  styleUrls: ['./product-card-cart.component.css']
})
export class ProductCardCartComponent implements OnInit {

  @Input() product: any;

  constructor(private router: Router, private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  deleteToCart() {
    this._shoppingCartService.deleteItem(this.product);
    parent.location.reload();
  }

}
