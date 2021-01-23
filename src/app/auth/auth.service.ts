import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(private api: ApiService) {}

  login(loginDto: LoginDto): Observable<void> {
    return this.api.post('auth/login', loginDto).pipe(
      tap(() => {
        this.isLoggedIn$.next(true);
      })
    );
  }

  logout(): Observable<void> {
    return this.api.post('auth/logout').pipe(
      tap(() => {
        this.loggedOut();
      })
    );
  }

  loggedOut() {
    this.isLoggedIn$.next(false);
  }

  register(registerDto: RegisterDto): Observable<void> {
    return this.api.post('auth/register', registerDto).pipe(mapTo(undefined));
  }

  isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  refreshToken(): Observable<void> {
    const headers = new HttpHeaders({
      ngExcludeInterceptor: 'true',
    });
    return this.api.post('auth/refresh', undefined, { headers });
  }
}
