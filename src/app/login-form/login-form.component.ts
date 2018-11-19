// reference: https://code-maze.com/authentication-aspnetcore-jwt-2/


import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  //private URL_LOGIN = "https://localhost:44390/login";
  private URL_LOGIN = "https://c3973a2.azurewebsites.net/login";
  

  invalidLogin: boolean;

  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {  }

  
  login(username:string, password:string) {
    return this._http.post(this.URL_LOGIN, {username, password}, httpOptions
          ).subscribe(response => {
            let token = (<any>response).token;
            localStorage.setItem("jwt", token);
            this.invalidLogin = false;
            this._router.navigate(["/"]);
          }, err => {
            this.invalidLogin = true;
          });
  }

}
