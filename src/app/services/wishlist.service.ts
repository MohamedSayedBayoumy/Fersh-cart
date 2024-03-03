import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  numOfWishListItem = new BehaviorSubject(0);
  baseUrl: string = 'https://ecommerce.routemisr.com';
  headers = { token: localStorage.getItem('userToken') || '' };
  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserWishList().subscribe({
      next: (response) => {
        console.log(response);
        this.numOfWishListItem.next(response.count);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToWishList(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`, {
      productId: productId,
    });
  }

  getLoggedUserWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`);
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/api/v1/wishlist/${productId}`
    );
  }
}
