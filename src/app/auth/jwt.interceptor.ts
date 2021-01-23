import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, take, takeUntil } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshing = false;
  tokenRefreshed$: Subject<void> = new Subject();
  refreshTokenError$: Subject<void> = new Subject();
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('ngExcludeInterceptor')) {
      request = request.clone({
        headers: request.headers.delete('ngExcludeInterceptor'),
      });
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(err);
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

      return this.authService.refreshToken().pipe(
        catchError((err: any) => {
          this.isRefreshing = false;
          this.authService.loggedOut();
          this.refreshTokenError$.next();
          this.router.navigate(['/auth/login']);
          return throwError(err);
        }),
        switchMap(() => {
          this.isRefreshing = false;
          this.tokenRefreshed$.next();
          return next.handle(request);
        })
      );
    } else {
      return this.tokenRefreshed$.pipe(
        takeUntil(this.refreshTokenError$),
        take(1),
        switchMap(() => next.handle(request))
      );
    }
  }
}
