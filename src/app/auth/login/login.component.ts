import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { getError } from 'src/app/shared/utils';

import { AuthService } from '../auth.service';
import { LoginDto } from '../login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnDestroy {
  form: FormGroup = this.buildForm();
  destroy$: Subject<void> = new Subject();
  isLogging = false;
  serverError: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    this.isLogging = true;
    this.form.disable();

    const loginDto: LoginDto = this.form.getRawValue();

    this.authService
      .login(loginDto)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLogging = false;
          this.form.enable();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.serverError = err?.error.message;
        },
      });
  }

  buildForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(/^\w*$/),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
    });
  }

  getError(control: AbstractControl): string | void {
    const error = getError(control);

    if (!!error) {
      return error;
    }

    const errors = control?.errors;
    if (errors?.pattern) {
      return 'Special characters are unsupported';
    }
  }

  get username(): AbstractControl {
    return this.form.controls['username'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }
}
