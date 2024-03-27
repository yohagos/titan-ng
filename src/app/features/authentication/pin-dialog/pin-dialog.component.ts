import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import { User, UserBasic } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin-dialog.component.html',
  styleUrl: './pin-dialog.component.scss',
  animations: [
    trigger('shake', [
      state('start', style({ transform: 'translate3d(0, 0, 0)' })),
      state('end', style({ transform: 'translate3d(-10px, 0, 0)' })),
      transition('start => end', animate('500ms ease-in-out', keyframes([
        style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.1 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.2 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.3 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.4 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.5 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.6 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.7 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.8 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.9 }),
        style({ transform: 'translate3d(0, 0, 0)', offset: 1 })
      ])))
    ])
  ]
})
export class PinDialogComponent {
  state = 'start'
  pinForm: FormGroup

  user!: UserBasic

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<PinDialogComponent>
  ) {
    this.pinForm = this.formBuilder.group({
      pin: new FormControl({value: '', disabled: true}, Validators.required)
    })
  }

  numClick(num: string) {
    if (num == 'C') {
      this.pinForm.get('pin')?.setValue('')
    } else {
      let pin: string = this.pinForm.get('pin')?.value
      pin += num
      this.pinForm.get('pin')?.setValue(pin)
      if (pin.length == 4) {
        this.authenticate(pin)
      }
    }
  }

  authenticate(pin: string) {
    this.userService.pinAuthentication(pin).subscribe({
      next: (data) => {
        this.pinForm.get('pin')?.setValue('')
        this.user = data as UserBasic
        this.userService.savePin(this.user.pin)
        this.userService.saveCurrentUser(this.user as User)
        this.dialogRef.close(this.user)
      },
      error: (err) => {
        this.state = 'end'
        setTimeout(() => {
          this.state = 'start'
        }, 300)
        this.pinForm.get('pin')?.setValue('')

        this.snackbarService.snackbarError(err.error.message, 'Error')
      }
    })
  }

}
