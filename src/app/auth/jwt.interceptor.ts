import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { JwtTokenDto } from './jwt-token.dto';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshing = false;
  refreshToken$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getJwtToken();
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshToken$.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: JwtTokenDto) => {
          this.isRefreshing = false;
          this.refreshToken$.next(token.accessToken);
          return next.handle(this.addToken(request, token.accessToken));
        })
      );
    } else {
      return this.refreshToken$.pipe(
        filter((token: string) => token !== null),
        take(1),
        switchMap((token: string) => next.handle(this.addToken(request, token)))
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
