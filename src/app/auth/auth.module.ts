import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent, RegisterComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
