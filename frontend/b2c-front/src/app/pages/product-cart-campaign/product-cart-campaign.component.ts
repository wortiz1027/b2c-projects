import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Producto } from 'src/app/services/productos.service';

@Component({
  selector: 'app-product-cart-campaign',
  templateUrl: './product-cart-campaign.component.html',
  styleUrls: ['./product-cart-campaign.component.css']
})
export class ProductCartCampaignComponent implements OnInit {

  @Input() product: Producto;
  @Input() discount: any;

  constructor(private router: Router,
    private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  getDetails() {
    this.router.navigate(['/product-details', this.product.productCode]);
  }

  addToCart() {
    console.log('Cantidad de productos: ', this._shoppingCartService.getTotalProducts());
    const productToSave: Producto = {};
    productToSave.productId = this.product.productId;
    productToSave.productCode = this.product.productCode;
    productToSave.productName = this.product.productName;
    productToSave.productDescription = this.product.productDescription;
    productToSave.productPrice = this.product.productPrice - (this.product.productPrice * this.discount / 100);
    this._shoppingCartService.addItemToCart(productToSave);
  }

}
