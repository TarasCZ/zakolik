import {AbstractControl} from '@angular/forms';

export function notZeroValidator(control: AbstractControl) {
  return control.value === 0 ? { zero: true } : null;
}
