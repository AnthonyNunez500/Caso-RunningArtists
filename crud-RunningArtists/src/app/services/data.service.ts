import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Offer } from '../models/offer.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  base_Url = "http://localhost:3000/Offer"
  constructor(private http: HttpClient) { }
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json',})}
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //Por defecto : D
      console.log(`Error ocurred: ${error.status}, body was ${error.error}`);
    }
    else{
      //No salio :(
      console.log(`An error ocurred ${error.status}, body was ${error.error}`);
    }
    return throwError( 'Something happened with request, try again...' )
  }
  createItem(item: any): Observable<Offer>{
    return this.http
      .post<Offer>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  getList(): Observable<Offer>{
    return this.http
    .get<Offer>(this.base_Url)
    .pipe(retry(2), catchError(this.handleError))
  }
  getItem(id:string):Observable<Offer>{
    return this.http
      .get<Offer>(this.base_Url + '/' + id)
      .pipe(retry(2), catchError(this.handleError))
  }
  updateItem(id:string, item: any): Observable<Offer>{
    return this.http
    .put<Offer>(this.base_Url + '/' + id,JSON.stringify(item),this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
  }
  deleteItem(id:string): Observable<Offer>{
    return this.http
    .delete<Offer>(`${this.base_Url}/${id}`,this.httpOptions)
    .pipe(retry(2), catchError(this.handleError))
  }
}
