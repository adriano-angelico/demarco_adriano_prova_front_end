import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = 'token-teste';

    const authReq = req.clone({
      headers: req.headers.set('Token', `Bearer ${authToken}`),
    });

    return next.handle(authReq);
  }
}
