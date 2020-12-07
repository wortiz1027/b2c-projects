import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreditCardValidators, CreditCardDirectivesModule } from 'angular-cc-library';
import { PaymentService, CreditCardRq } from 'src/app/services/payment.service';
import { OrdersService, OrderSearch } from 'src/app/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LoginService } from 'src/app/services/login.service';
import { BpmService } from 'src/app/services/bpm.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public order: OrderSearch = {};
  public total = 0;
  public orderId = '';

  constructor(private formBuilder: FormBuilder,
    private _paymentService: PaymentService,
    private _ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService,
    private router: Router,
    private _loginService: LoginService,
    private _bpmService: BpmService) {
      this.activatedRoute.params.subscribe(params => {
        this.orderId = params['orderId'];
        this.total = params['total'];
        // this.getDetail(orderId);
      });
    }

  creditCard: CreditCardRq = {};

  formCreditCard = this.formBuilder.group({
    creditCard: ['', [CreditCardValidators.validateCCNumber]],
    expirationDate: ['', [CreditCardValidators.validateExpDate]],
    cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
  });

  ngOnInit(): void {
  }

  payRegister() {
    if (this.formCreditCard.invalid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }
    this.creditCard.type = 'VISA';
    this.creditCard.mount = 12343;
    this.creditCard.number = this.formCreditCard.get('creditCard').value;
    this._paymentService.validateCreditCard(this.creditCard).subscribe(
      (res) => {
        this._shoppingCartService.clearCart();
        this._bpmService.instanceOrderBPM(this.orderId).subscribe(
          (resBPM) => {
            console.log('resBPM');
          },
          (errorBPM) => {
            console.error(errorBPM);
            if (errorBPM.status === 401) {
              this._loginService.userLogout();
            }
          }
        );
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.error(error);
        if (error.status === 401) {
          this._loginService.userLogout();
        }
      }
    );
  }

  getDetail(orderId: string) {
    this._ordersService.getOrderDetails(orderId).subscribe(
      (res) => {
        this.order = res.order;
      },
      (error) => {
        console.error('Error ', error);
        if (error.status === 401) {
          this._loginService.userLogout();
        }
      }
    );
  }

}
