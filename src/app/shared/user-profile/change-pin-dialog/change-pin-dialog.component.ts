import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserUpdatePin } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-pin-dialog',
  templateUrl: './change-pin-dialog.component.html',
  styleUrl: './change-pin-dialog.component.scss'
})
export class ChangePinDialogComponent {
  currentUser: User | undefined

  pinForm: FormGroup

  constructor(
    private dialogRef: MatDialogRef<ChangePinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.currentUser = data.user
    console.log(this.currentUser)

    this.pinForm = formBuilder.group({
      previousPin: new FormControl('', Validators.required),
      newPin: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      repeatNewPin: new FormControl('', [Validators.required, Validators.maxLength(4)])
    })
  }

  areFieldsEqual() {
    let pinOne: string = this.pinForm.get('newPin')?.value
    let pinTwo: string = this.pinForm.get('repeatNewPin')?.value
    if (pinTwo.length == 4 && pinOne.length == 4 ) return pinOne === pinTwo
    return true
  }

  updatePin() {
    let request: UserUpdatePin = {
      pin: this.pinForm.get('newPin')?.value,
      userId: this.currentUser?.id
    }
    this.userService.pinUpdate(request).subscribe({
      next: () => {
        this.snackbar.open("Changed Pin", "close", {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['red-snackbar']
        })
        this.dialogRef.close()
      },
      error: (err) => {
        this.snackbar.open("Error", "Try Again!", {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['red-snackbar']
        })
      }
    })
  }

  pinOneLength() {
    let pin: string = this.pinForm.get('newPin')?.value
    return pin.length == 4
  }

  pinTwoLength() {
    let pin: string = this.pinForm.get('repeatNewPin')?.value
    return pin.length == 4
  }
}
