import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { pathToFileURL } from 'url';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  backendUrl:string = ''
  imagesUrl:string = ''
  storageTokenQuery:string = ''

  get userId(){
    var userString = window.localStorage['user'];
    if(userString){
        var user = JSON.parse(userString);
        return user['userId'];
    } 
  }
  
  constructor(
    private http: HttpClient,private router: Router
  ) {
    this.backendUrl = environment.backend_url;

    this.imagesUrl = environment.images_url
    if(environment.images_url.includes('firebasestorage.googleapis.com'))
      this.storageTokenQuery = "?alt=media"
/*
    console.log('current URL',  window.location.href);
    if(window.location.href.startsWith('http://localhost:4200/')){
      this.backendUrl = 'http://localhost:3000'
    }*/

  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  getImageUrl(path:string){
    return this.imagesUrl + path + this.storageTokenQuery
  }

  getUser(){
    var user = JSON.parse(window.localStorage['user']);
    return user;
  }

  query(body: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/postgre/query`, body, { headers: { 'Content-Type': 'text/plain' } })
      .pipe(catchError(this.formatErrors));
  }

  insert(body: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/postgre/insert`, body)
      .pipe(catchError(this.formatErrors));
  }

  update(body: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/postgre/update`, body)
      .pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.backendUrl}${ (path.startsWith('/') ? '' : '/') + path}`, { params }) // ${environment.backend_url}
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.backendUrl}${(path.startsWith('/') ? '' : '/') + path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.backendUrl}${(path.startsWith('/') ? '' : '/') + path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.backendUrl}${(path.startsWith('/') ? '' : '/') + path}`
    ).pipe(catchError(this.formatErrors));
  }
}
