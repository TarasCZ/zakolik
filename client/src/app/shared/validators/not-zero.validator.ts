import {AbstractControl, ValidatorFn} from '@angular/forms';

export function notZeroValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log(control.value);
    return control.value && control.value !== 0 ? { value: control.value } : null;
  }
}
