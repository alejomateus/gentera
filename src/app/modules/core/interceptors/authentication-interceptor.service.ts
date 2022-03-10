import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { CustomHttpParams } from '@app/helpers/custom-http-params';
import { AuthenticationService } from '@shared/services/authentication.service';
import { environment } from '@environment';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  token: string = '';
  ngCaptcha: string = '';
  constructor(private authenticationService: AuthenticationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }
  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
    headers = headers.append('orderskey', environment.ordersKey);
    if (req.params instanceof CustomHttpParams && req.params.type) {
      const userData: any =
        await this.authenticationService.getCurrentAuthenticatedUser();
      if (userData) {
        this.token = userData.access;
      }
      if (req.params.type === 'api-with-token') {
        headers = headers.append('Authorization', `Bearer ${this.token}`);
      }
    }
    const authReq = req.clone({
      headers,
      params: undefined,
    });
    return next.handle(authReq).toPromise();
  }
}
