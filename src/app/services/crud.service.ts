import { catchError, Observable, Subject, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Crud } from '../interfaces/curd';

export abstract class CrudService<T, ID> implements Crud<T, ID> {
  private _refreshRequired = new Subject<void>();

  constructor(protected _http: HttpClient, protected _base: string) {}

  get RefreshRequired() {
    return this._refreshRequired;
  }

  findAll(): Observable<T[]> {
    return this._http
      .get<T[]>(this._base)
      .pipe(take(1), catchError(this.handleError));
  }

  findOne(id: ID): Observable<T> {
    return this._http
      .get<T>(`${this._base}/${id}`)
      .pipe(take(1), catchError(this.handleError));
  }

  create(t: T): Observable<T> {
    return this._http.post<T>(this._base, t).pipe(
      tap(() => this.RefreshRequired.next()),
      take(1),
      catchError(this.handleError)
    );
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(`${this._base}/${id}`, t).pipe(
      tap(() => this.RefreshRequired.next()),
      take(1),
      catchError(this.handleError)
    );
  }

  delete(id: ID): Observable<any> {
    return this._http.delete(`${this._base}/${id}`).pipe(
      tap(() => this.RefreshRequired.next()),
      take(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    return throwError('Error when communicating with the API!');
  }
}
