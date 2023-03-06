import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends CrudService<Customer, number> {
  constructor(protected override _http: HttpClient) {
    super(_http, 'http://localhost:3000/customers');
  }
}
