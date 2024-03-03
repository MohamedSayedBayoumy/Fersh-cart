import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userLoginData = new BehaviorSubject(null);

  baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.decodeUserToken();
    }
  }
  register(data: UserData): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }
  login(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data);
  }
  decodeUserToken() {
    let userToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodeToken: any = jwtDecode(userToken);
    this.userLoginData.next(decodeToken);
    console.log(this.userLoginData);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userLoginData.next(null);
    this._Router.navigate(['/login']);
  }

  forgetPassword(userEmail: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/forgotPasswords`,
      { email: userEmail }
    );
  }

  resetPassword(resetCode: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/verifyResetCode`,
      { resetCode: resetCode }
    );
  }

  loginWithNewPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
