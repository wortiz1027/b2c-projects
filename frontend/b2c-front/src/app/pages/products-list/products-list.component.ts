import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { LoginService } from '../../services/login.service';
import { CampaignsService, Campaign } from 'src/app/services/campaigns.service';
import { Router } from '@angular/router';

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
  public textSearch = '';
  public campaigns: Campaign[] = [];

  constructor(private _productosService: ProductosService,
    private _loginService: LoginService,
    private _campaignsService: CampaignsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProductsWithPage('', true);
    this.getCampaigns();
  }

  onDataChange(event: any) {
    this.currentPage = event - 1;
    this.getProductsWithPage(this.textSearch, false);
  }

  getProductsWithPage(textSearch: string, isInitialSearch: boolean) {
    console.log('Texto de búsqueda: ', textSearch);
    if (isInitialSearch) {
      this.currentPage = 0;
    }
    if (textSearch === '' || textSearch === null) {
      this.textSearch = '';
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
          if (error.status === 401) {
            this._loginService.userLogout();
          }
        }
      );
    } else {
      this.textSearch = textSearch;
      this._productosService.getProductosByText(this.textSearch, this.currentPage, this.totalItemsToShow).subscribe(
        (res) => {
          console.log('result text: ', res);
          this.productosResult = res.data.products;
          this.totalItems = res.data.totalItems;
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.currentPage;
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

  onSlide(event) {
    const imageIndex = parseInt(event.current.replace('slideId_', ''), 10);
  }

  getCampaigns() {
    this._campaignsService.getAllCampaigns().subscribe(
      (res) => {
        console.log('Campaigns: ', JSON.stringify(res));
        this.campaigns = res.data.campaigns;
        this._loginService.refreshToken();
      },
      (error) => {
        console.log('Error: ', JSON.stringify(error));
        if (error.status === 401) {
          this._loginService.userLogout();
        }
      }
    );
  }

  getCampaignDetail(campaign: Campaign) {
    console.log('Campaign Detail: ', JSON.stringify(campaign));
    this.router.navigate(['/campaign-detail', campaign.campaignId, campaign.discount]);
  }

}
