import { AbstractControl } from '@angular/forms';

export function getError(control: AbstractControl): string | void {
  const errors = control?.errors;

  if (errors?.required) {
    return 'Required field';
  }

  if (errors?.minlength) {
    return `Minimum ${errors.minlength.requiredLength} characters`;
  }

  if (errors?.maxlength) {
    return `Maximum ${errors.maxlength.requiredLength} characters`;
  }
}
