import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  public static yearValidator(year: FormControl): ValidationErrors | null {
    if (year.value < 1900) {
      return { invalidYear: true };
    }
    return null;
  }
}
