import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDtails } from '../interfaces/order-dtails';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  headers = { token: localStorage.getItem('userToken') || '' };
  constructor(private _HttpClient: HttpClient) {}

  checkOut(cartId: string, shippingAddress: OrderDtails): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/`,
      { shippingAddress: shippingAddress }
    );
  }

  getUserOrders(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${userId}`);
  }
}
