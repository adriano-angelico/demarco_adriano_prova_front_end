import { Observable } from 'rxjs';

export interface Crud<T, ID> {
  create(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  findOne(id: ID): Observable<T>;
  findAll(): Observable<T[]>;
  delete(id: ID): Observable<any>;
}
