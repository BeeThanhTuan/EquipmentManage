import { AbstractControl, ValidatorFn } from '@angular/forms';
// Custom validator function
export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isNumeric = /^[0-9]+$/.test(control.value);
    return !isNumeric ? { 'numeric': { value: control.value } } : null;
  };
}

