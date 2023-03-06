import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CustomersService } from 'src/app/services/customers.service';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  customerForm!: FormGroup;
  customerData: Customer[] = [];
  label!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit() {
    this.label = true;
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required]],
      city: ['', Validators.required],
    });

    if (this.data) {
      this.label = false;
      this.customerService.findOne(this.data).subscribe((res: Customer) => {
        this.customerForm.patchValue(res);
      });
    }
  }

  onSubmit() {
    if (this.data) {
      if (this.customerForm.valid) {
        this.customerService
          .update(this.data, this.customerForm.value)
          .subscribe(
            (_success) => {
              this.openSnackBar('SNACKBAR_MESSAGE.SNACKBAR_MESSAGE_UPDATE');
            },
            (_error) => {
              this.openSnackBar('Unable to fulfill your request!');
            }
          );
      }
    } else {
      if (this.customerForm.valid) {
        this.customerService.create(this.customerForm.value).subscribe(
          (_success) => {
            this.openSnackBar('SNACKBAR_MESSAGE.SNACKBAR_MESSAGE_SAVE');
          },
          (_error) => {
            this.openSnackBar('Unable to fulfill your request!');
          }
        );
      }
    }

    this.customerForm.reset();
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, { data: message });
  }
}
