import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  //private URL_REGISTER = "https://localhost:44390/register";
  private URL_REGISTER = "https://c3973a2.azurewebsites.net/register";
  

  registerErr : boolean;
  registerOk : boolean;

  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
    this.registerErr = false;
    this.registerOk = false;
  }

  register(username:string, email:string, password:string) {
    return this._http.post(this.URL_REGISTER, {username, email, password}, httpOptions
          ).subscribe(response => {
            this.registerOk = true;            
          }, err => {
            this.registerErr = true;  
          });
  }

}
