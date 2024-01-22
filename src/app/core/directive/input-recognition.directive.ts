import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appInputRecognition]'
})
export class InputRecognitionDirective {
  @Input('appInputRecognition') previousValue: string | undefined

  constructor(
    private elementRef: ElementRef,
    private snackBar: MatSnackBar
  ) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const currentValue = (event.target as HTMLInputElement).value
    if (currentValue.length >=4 ) {
      if (currentValue !== this.previousValue) {
        this.snackBar.open('Pin does not match', 'Close', {
          duration: 4000,
          panelClass: ['snackbarError'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    }
  }

}
