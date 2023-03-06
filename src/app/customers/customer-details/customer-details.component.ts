import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Customer } from 'src/app/interfaces/customer';
import { Orders } from 'src/app/interfaces/orders';
import { CustomersService } from 'src/app/services/customers.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {
  customerDetails$: Observable<Customer> | undefined;
  customerOrders$: Observable<Orders> | undefined;

  constructor(
    private customerService: CustomersService,
    private ordersService: OrdersService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    this.customerDetails$ = this.customerService.findOne(this.data);
    this.customerOrders$ = this.ordersService.findOne(this.data);
  }
}
