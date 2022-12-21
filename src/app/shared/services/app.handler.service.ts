import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from '../model/model.api';
import * as jwt_decode from 'jwt-decode';



const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AppHandlerService {
  errors: string[] = [];
  _apiURI: string;
  keyToken: string = 'token';
  keyUsr: string = 'user';

  constructor(private router: Router) {
    this.errors = [];
    this._apiURI = 'http://localhost:5000/api/';
    //this._apiURI='https://dat-analytics.com/api/';
   
    // this._apiURI = 'https://develop-training.dat-analytics.com/api/';
  }

  getApiURI() {
    return this._apiURI;
  }

  getApiHost() {
    return this._apiURI.replace('api/', '');
  }

  isLogin(): boolean {
    let token = this.getToken();
    if (token != null && !jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else
      return false;
  }

  logIn(token: any) {
    //set token
    localStorage.setItem(this.keyToken, token);

    //set current user
    let access_token = this.getToken();
    var decoded_token = jwt_decode(access_token);
    let currentUsr: CurrentUser = {
      roles: [],
      permissions: [],
      isAdmin: (decoded_token['isAdmin'] === "True"),
      isStudent: (decoded_token['isStudent'] === "True"),
      isInstructor: (decoded_token['isInstructor'] === "True"),
      firstLogin: (decoded_token['firstLogin'] === "True"),
      UrlProfilePicture: (decoded_token.UrlProfilePicture),
      id: decoded_token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      userName: decoded_token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      email: decoded_token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    };
    //console.log(currentUsr);

    //set roles
    var roles = decoded_token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (roles != undefined) {
      if (typeof roles === "string") {
        currentUsr.roles.push(roles);
      }
      else {
        Object.values(roles).forEach(r => {
          currentUsr.roles.push(r as string);
        });
      }
    }

    //set permissions
    var permissions = decoded_token['dat.analytics.api/permission'];
    if (permissions != undefined) {
      if (typeof permissions === "string") {
        currentUsr.permissions.push(permissions);
      }
      else {
        Object.values(permissions).forEach(p => {
          currentUsr.permissions.push(p as string);
        });
      }
    }

    //set          
    localStorage.setItem(this.keyUsr, JSON.stringify(currentUsr));

    //navigate to home
    this.goToHome();
  }

  isAdmin(): boolean {

    return this.getCurrentUser().isAdmin;

  }

  isStudent(): boolean {

    return this.getCurrentUser().isStudent;

  }

  isInstructor(): boolean {


    return this.getCurrentUser().isInstructor;

  }

  usrHasPermission(value: string): boolean {
    if (this.getCurrentUser().permissions.includes(value))
      return true;
    else
      return false;
  }

  getCurrentUser(): CurrentUser {
    let currentUsr = JSON.parse(localStorage.getItem(this.keyUsr));
    return currentUsr;
  }

  getToken(): any {
    return localStorage.getItem(this.keyToken);
  }

  logOut() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyUsr);
    this.goToHome();
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
    // location.href="https://www.dat-analytics.com/#/dat-training";
  }

  getErrosMessages(errRsp: HttpErrorResponse) {



    this.errors = [];
    if (errRsp.status === 400) {

      if (errRsp.error.errors === undefined || errRsp.error.errors === null) {
        this.errors.push(errRsp.error);
      }
      else {
        Object.values(errRsp.error.errors).forEach(err => {
          Object.values(err).forEach(msg => {
            this.errors.push(msg);
          });
        });
      }

    } else {
      this.errors.push(errRsp.error.message);
    }
    return this.errors;
  }
}

