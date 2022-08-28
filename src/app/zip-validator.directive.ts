import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
} from "@angular/forms";

@Directive({
  selector: "[appZipValidator]",
  providers: [
    { provide: NG_VALIDATORS, useClass: ZipValidatorDirective, multi: true },
  ],
})
export class ZipValidatorDirective implements Validator {
  constructor() { }

  validate(control: AbstractControl) {
    const elementValue = control.value;

    if (
      elementValue === null ||
      elementValue === undefined ||
      elementValue === ""
    ) {
      return { cus_required: "Field is required" };
    }

    const reg = new RegExp("^[0-9]{6}$");
    if (!reg.test(elementValue)) {
      return { cus_pattern: "Value should be 6 digit number." };
    }

    return null;
  }
}
