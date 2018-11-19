import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  private jwtHelper = new JwtHelperService();
  
  constructor(private router: Router) {
  }

  canActivate() {
    var token = localStorage.getItem("jwt");
 
    if (token && !this.jwtHelper.isTokenExpired(token)){
      //console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    this.router.navigate(["login-form"]);
    return false;
  }


}
