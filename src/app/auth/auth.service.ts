import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { JwtTokenDto } from './jwt-token.dto';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_ACCESS_TOKEN = 'JWT_ACCESS_TOKEN';

  constructor(private api: ApiService) {}

  login(loginDto: LoginDto): Observable<void> {
    return this.api.post('auth/login', loginDto).pipe(
      tap((token: JwtTokenDto) => {
        this.storeToken(token);
      }),
      mapTo(undefined)
    );
  }

  register(registerDto: RegisterDto): Observable<void> {
    return this.api.post('auth/register', registerDto).pipe(mapTo(undefined));
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_ACCESS_TOKEN);
  }

  refreshToken(): Observable<JwtTokenDto> {
    throw new Error('Not implemented.');
  }

  private storeToken(token: JwtTokenDto) {
    localStorage.setItem(this.JWT_ACCESS_TOKEN, token.accessToken);
  }
}
