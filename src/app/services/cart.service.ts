import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItems = new BehaviorSubject(0);
  baseUrl: string = 'https://ecommerce.routemisr.com';
  headers = { token: localStorage.getItem('userToken') || '' };
  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this.numOfCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`, { productId });
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`);
  }
  removeProductFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`);
  }
  clearAllCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`);
  }

  updateProductQuantity(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`, {
      count: count,
    });
  }
}
