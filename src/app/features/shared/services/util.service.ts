import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  capitalizeFirstLetter(value: string | undefined) {
    if (!value) return value
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }

  increaseToNextFullNumber(value: number) {
    if (this.hasDecimalPoints(value)) {
      return Math.ceil(value);
    }
    return value + 1
  }

  hasDecimalPoints(value: number) {
    let fractionalPart = value % 1
    console.log(fractionalPart)
    return fractionalPart > 0
  }
}
