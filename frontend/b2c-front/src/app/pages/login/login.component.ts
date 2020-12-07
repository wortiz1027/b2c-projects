import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService, ResponseService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  obs: Observable<any>;
  userToLogin: any = {};
  responseService: ResponseService;
  constructor(private _loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _userService: UserService) { }

  loginUsersForm = this.formBuilder.group({
    username: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }]
  });

  ngOnInit(): void { }

  ngOnDestroy() { }

  loginUser() {
    if (this.loginUsersForm.invalid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }

    this.userToLogin.username = this.loginUsersForm.get('username').value;
    this.userToLogin.password = this.loginUsersForm.get('password').value;

    this._loginService.userLogin(this.userToLogin).subscribe(
      (res) => {
        this.responseService = res;
        this.responseService.username = this.userToLogin.username;
        this._loginService.setToken(this.responseService);
        this._loginService.setUserInformation(this.userToLogin.username);
        this._userService.getUserDetailByUsername(this.userToLogin.username).subscribe(
          (res2) => {
            this._loginService.setUserDetails(res2.user.cedula);
          },
          (error) => {
            console.error(error);
          }
        );
        this.router.navigate(['/products-list']);
      },
      (error) => {
        console.log('Error {}', error);
      }
    );
  }

  getMensajeError(field: string): string {
    let mensaje: string;

    if (this.loginUsersForm.get(field).errors.required) {
      mensaje = 'El campo es requerido';
    } else if (this.loginUsersForm.get(field).hasError('pattern')) {
      mensaje = 'Ingrese un valor válido';
    }

    return mensaje;
  }

  verificarCampo(field: string): boolean {
    return ((this.loginUsersForm.get(field).dirty || this.loginUsersForm.get(field).touched) &&
      !this.loginUsersForm.get(field).valid);
  }

}
