import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerDeleteComponent } from '../customer-delete/customer-delete.component';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';

const TABLE_COLUMNS: string[] = ['id', 'name', 'age', 'city', 'actions'];

@Component({
  selector: 'app-customers-list',
  templateUrl: 'customers-list.component.html',
  styleUrls: ['customers-list.component.scss'],
})
export class CustomersListComponent
  extends MatPaginatorIntl
  implements OnInit, AfterViewInit
{
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = TABLE_COLUMNS;
  dataSource = new MatTableDataSource<Customer[]>();
  isLoading = true;
  isFilter = false;

  constructor(
    private service: CustomersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAll();

    this.service.RefreshRequired.subscribe(() => this.getAll());
  }

  getAll(): void {
    this.service.findAll().subscribe(
      (list: any) => {
        this.isLoading = false;
        this.dataSource.data = list;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => this.openSnackBar(error)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.isFilter = true;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCustomerDetailsDialog(id: number): void {
    this.dialog.open(CustomerDetailsComponent, { width: '400px', data: id });
  }

  openCustomerFormDialog(id?: number): void {
    this.dialog.open(CustomerFormComponent, { width: '400px', data: id });
  }

  openCustomerDeleteDialog(id: number): void {
    this.dialog.open(CustomerDeleteComponent, { data: id });
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, { data: message });
  }
}
