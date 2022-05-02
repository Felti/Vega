import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
// Services
import { AuthService } from '../services/auth.service';


@Injectable()
export class HttpJwtTokenInterceptor implements HttpInterceptor {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
		console.log("intercepted request ... ");
		
    if (
      request.url.indexOf('/auth/sign-in') === -1 &&
      request.url.indexOf('/auth/password-reset') === -1 &&
      request.url.indexOf('/auth/change-password') === -1 &&
      request.url.indexOf('/auth/verify-password-reset-token') === -1
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
    }
    return next.handle(request);
  }
}
