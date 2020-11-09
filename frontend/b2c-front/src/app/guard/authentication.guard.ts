import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private _loginService: LoginService,
              private router: Router) {
  }
  canActivate(): boolean {
    if (this._loginService.getToken() === '' || this._loginService.getToken() === undefined) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
