import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDecimalFormatter]'
})
export class DecimalFormatterDirective {

  constructor(
    private elementRef: ElementRef,
    private control: NgControl
  ) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const formattedValue = this.formatDecimal(value);
    this.control.control?.setValue(formattedValue, { emitEvent: false });
  }

  private formatDecimal(value: string) {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? null : parsedValue.toFixed(2);
  }

}
