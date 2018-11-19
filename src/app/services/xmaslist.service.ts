// reference: https://code-maze.com/authentication-aspnetcore-jwt-2/
// reference:  https://angular.io/tutorial

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Child } from '../models/child';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class XmaslistService {
  //private URL = "https://localhost:44390/api/children";
  private URL = "https://c3973a2.azurewebsites.net/api/children";
  

  constructor(public _http: HttpClient) { }


  getXmasListing() : Observable<Child[]> {
    let token = localStorage.getItem("jwt");
    return this._http.get<Child[]>(this.URL, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    })
    .pipe(
      catchError(this.handleError('getXmasListing', []))
    );
  }


  /** DELETE: delete the child from the server */
  deleteChild (child: Child | number): Observable<Child> {
    const id = typeof child === 'number' ? child : child.id;
    const url = `${this.URL}/${id}`;
    let token = localStorage.getItem("jwt");

    return this._http.delete<Child>(url, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).pipe(
      catchError(this.handleError<Child>('deleteChild'))
    );
  }


  /** POST: add a new child to the server */
  addChild (child: Child): Observable<Child> {
    let token = localStorage.getItem("jwt");

    return this._http.post<Child>(this.URL, child, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).pipe(
      catchError(this.handleError<Child>('addChild'))
    );
  }  

  /** PUT: update the child on the server */
  updateChild (child: Child): Observable<any> {    
    const url = `${this.URL}/${child.id}`;
    let token = localStorage.getItem("jwt");

    return this._http.put(url, child, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).pipe(
      catchError(this.handleError<any>('updateChild'))
    );
  }





  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }    


}
