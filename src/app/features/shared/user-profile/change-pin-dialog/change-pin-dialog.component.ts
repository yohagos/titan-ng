import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
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
    private formBuilder: FormBuilder
  ) {
    this.currentUser = data.user

    this.pinForm = formBuilder.group({
      previousPin: new FormControl('', Validators.required),
      newPin: new FormControl('', Validators.required),
      repeatNewPin: new FormControl('', Validators.required)
    })
  }

}
