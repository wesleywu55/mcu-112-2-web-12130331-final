import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _url = 'http://localhost:3000/orders';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private readonly httpClient = inject(HttpClient);

  add(order: Order) {
    return this.httpClient.post<Order>(this._url, order, { headers: this.headers });
  }
}
