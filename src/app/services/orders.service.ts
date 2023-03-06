import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Orders } from '../interfaces/orders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends CrudService<Orders, number> {
  constructor(protected override _http: HttpClient) {
    super(_http, 'http://localhost:3000/orders');
  }
}
