/**
 * Created By : Vipin Yadav
 */

import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import {
  trigger,
  state,
  animate,
  style,
  transition
} from "@angular/animations";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor() {}
}

export class ValidationService {
  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }
}

export function routerTransition() {
  return slideToLeft();
}

export function slideToLeft() {
  return trigger("routerTransition", [
    transition(":enter", [
      style({
        transform: "translateX(100%)",
        position: "fixed",
        width: "100%"
      }),
      animate("0.5s ease-in-out", style({ transform: "translateX(0%)" }))
    ]),
    transition(":leave", [
      style({ transform: "translateX(0%)", position: "fixed", width: "100%" }),
      animate("0.5s ease-in-out", style({ transform: "translateX(-100%)" }))
    ])
  ]);
}
 // set authorization token in header.............
export function setTokenInHeader(){
  const httpoptions =new HttpHeaders().set("Authorization", "Bearer " + JSON.parse(localStorage.getItem('userData')).token);
  return httpoptions;
}
//  formating the date as mm/dd/yyyy
export function dateFormate(date,formate){
  if(date && formate==="yyyy/MM/dd"){
    const arrDate=date.split("-");
    return arrDate[1]+"/"+arrDate[2]+"/"+arrDate[0];
  }
  else if(date && formate==="yyyy-MM-dd"){
    const arrDate= date.split("/");
    return arrDate[2]+"-"+arrDate[1]+"-"+arrDate[0];
  }else{
    return null;
  }
}
/**
 * Created By : Vipin Yadav
 */
