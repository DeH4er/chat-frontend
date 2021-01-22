import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { getError } from 'src/app/shared/utils';

import { AuthService } from '../auth.service';
import { RegisterDto } from '../register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnDestroy {
  form: FormGroup = this.buildForm();
  destroy$: Subject<void> = new Subject();

  isRegistering = false;
  serverError: any = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  register() {
    this.isRegistering = true;
    this.form.disable();

    const registerDto: RegisterDto = {
      username: this.username.value,
      password: this.password.value,
    };

    this.authService
      .register(registerDto)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isRegistering = false;
          this.form.enable();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (err: any) => {
          this.serverError = err?.error?.message;
        },
      });
  }

  buildForm(): FormGroup {
    return this.fb.group(
      {
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
        passwordRepeat: this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
      },
      {
        validators: [this.checkMatchingPasswords('password', 'passwordRepeat')],
      } as AbstractControlOptions
    );
  }

  checkMatchingPasswords(passwordField: string, passwordRepeatField: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordField];
      const passwordRepeat = group.controls[passwordRepeatField];

      if (password.value !== passwordRepeat.value) {
        return passwordRepeat.setErrors({ notEquivalent: true });
      }

      if (!passwordRepeat.errors) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { notEquivalent, ...rest } = passwordRepeat.errors;
      return passwordRepeat.setErrors(rest);
    };
  }

  getError(control: AbstractControl): string | void {
    const error = getError(control);

    if (!!error) {
      return error;
    }

    const errors = control?.errors;
    if (errors?.notEquivalent) {
      return 'Passwords are different';
    }

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

  get passwordRepeat(): AbstractControl {
    return this.form.controls['passwordRepeat'];
  }
}
