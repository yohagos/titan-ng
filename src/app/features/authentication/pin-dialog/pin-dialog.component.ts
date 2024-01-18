import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pin',
  templateUrl: './pin-dialog.component.html',
  styleUrl: './pin-dialog.component.scss'
})
export class PinDialogComponent {
  pinForm: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.pinForm = this.formBuilder.group({
      pin: new FormControl({value: '', disabled: true}, Validators.required)
    })
  }

  numClick(num: string) {
    if (num == 'C') {
      this.pinForm.get('pin')?.setValue('')
    } else {
      let pin = this.pinForm.get('pin')?.value
      pin += num
      this.pinForm.get('pin')?.setValue(pin)
    }
  }

}
