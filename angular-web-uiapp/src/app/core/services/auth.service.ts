import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from './api.service';
import { UserLoginRequest, UserLoginResponse } from 'src/app/model/user';


import { User } from '../model/user.model';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());


  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public authenticatedRoleSubject = new ReplaySubject<"HOSPITAL" | "ADMIN" | "VENDOR" | "PATIENT" | "NONE">(1);
  public authenticatedRole = this.authenticatedRoleSubject.asObservable();

  constructor(
    private apiService: ApiService
  ) {
    var userString = window.localStorage['user'];
    if (this.getToken() && userString) {

      this.isAuthenticatedSubject.next(true);
      var user = JSON.parse(userString);
      this.currentUserSubject.next(user);
      this.authenticatedRoleSubject.next(user.role);

    }

    this.authenticatedRole.subscribe(role => window.localStorage.setItem('ROLE', role))
  }

  getRole(): String {
    return window.localStorage.getItem('ROLE');
  }

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  setToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  removeToken() {
    window.localStorage.removeItem('jwtToken');
  }

  register(email: string, password: string) {

  }

  reLogin() {
    debugger
    return this.apiService.post('/auth/relogin', JSON.parse(window.localStorage['user'])).pipe(map(
      data => {
        console.log('Re-Login User -> response: ');
        console.log(data);
        debugger
        let response: UserLoginResponse = new UserLoginResponse(data);
        this.setToken(response.token);
        this.currentUserSubject.next(data);
        delete data['token']
        window.localStorage['user'] = JSON.stringify(data);
        window.sessionStorage['user'] = JSON.stringify(data);
        this.isAuthenticatedSubject.next(true);
        this.authenticatedRoleSubject.next(data.role);
        return response;
      },
      error => {
        debugger;
        this.logout()
      }
    ))
  }

  login(email: string, password: string) {
    let credentials: UserLoginRequest = new UserLoginRequest({
      email, password
    });
    return this.apiService.post('/auth/login', credentials)
      .pipe(map(
        data => {
          console.log('Login User -> response: ');
          console.log(data);

          let response: UserLoginResponse = new UserLoginResponse(data);
          this.setToken(response.token);
          this.currentUserSubject.next(data);
          delete data['token']
          window.localStorage['user'] = JSON.stringify(data);
          window.sessionStorage['user'] = JSON.stringify(data);
          this.isAuthenticatedSubject.next(true);
          this.authenticatedRoleSubject.next(data.role);
          return response;
        }
      ));
  }

  // for testing only
  fakeLogin(roleAs?:string){
    this.setToken('dummytoken');
    let user1: User = {"userId":"1c6c792f-0fdb-4b2e-a95e-798c6b892d2f","email":"h1@fake.com","role":"HOSPITAL", token:'dummytoken'};
    this.currentUserSubject.next(user1);
    var data = user1;
    delete data['token']
    window.localStorage['user'] = JSON.stringify(data);
    window.sessionStorage['user'] = JSON.stringify(data);
    this.isAuthenticatedSubject.next(true);
    this.authenticatedRoleSubject.next(data.role);
  }

  logout() {
    this.removeToken()
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('user');
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
    // this.authenticatedRoleSubject.next("HOSPITAL");
  }
}
