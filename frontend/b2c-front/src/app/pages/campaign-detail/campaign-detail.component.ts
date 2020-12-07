import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/services/campaigns.service';
import { ProductosService } from '../../services/productos.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {

  public campaignDetail: Campaign = {};
  public campaignId = '';
  public discount = '';
  public productosResult = [];
  public totalItems = 1;
  public totalItemsToShow = 10;
  public totalPages = 0;
  public currentPage = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private _loginService: LoginService,
    private _productosService: ProductosService) {
    this.activatedRoute.params.subscribe( params => {
      this.campaignId = params['campaignId'];
      this.discount = params['discount'];
    });
  }

  ngOnInit(): void {
    this.getProductsByCampaign();
  }

  getProductsByCampaign() {
    this._productosService.getProductsByCampaign(this.campaignId, this.currentPage, this.totalItemsToShow).subscribe(
      (res) => {
        this.productosResult = res.campaign.data.products;
        this.totalItems = res.campaign.data.totalItems;
        this.totalPages = res.campaign.data.totalPages;
        this.currentPage = res.campaign.data.currentPage;
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
