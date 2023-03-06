import { Component, TemplateRef, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

import { Customer } from 'src/app/interfaces/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.scss'],
})
export class CustomerDeleteComponent {
  @ViewChild(TemplateRef)
  dialogTemplate!: TemplateRef<any>;
  customerDetails$: Observable<Customer> | undefined;
  customerData: any | undefined;

  constructor(
    private customerService: CustomersService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    readonly dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.customerDetails$ = this.customerService.findOne(this.data);
    this.customerData = this.customerDetails$;
  }

  deleteCustomer(id: number): void {
    this.customerService.delete(id).subscribe(
      (_success) => {
        this.customerData = this.customerData.pipe(
          filter((res: { customerId: any }) => res.customerId !== 1236)
        );

        this.openSnackBar('Customer deleted successfully!');
      },
      (_error) => {
        this.openSnackBar('Unable to fulfill your request!');
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, { data: message });
  }
}
