import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User, UserBasic } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ChangePinDialogComponent } from './change-pin-dialog/change-pin-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  currentUser: User | null

  profileForm: FormGroup

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.currentUser = this.userService.getCurrentUser()

    this.profileForm = this.formBuilder.group({
      firstname: new FormControl(this.currentUser?.firstname),
      lastname: new FormControl(this.currentUser?.lastname),
      email: new FormControl(this.currentUser?.email),
      role: new FormControl(this.capitalizeFirstLetter(this.currentUser?.role)),
      pin: new FormControl(this.currentUser?.pin)
    })
  }

  capitalizeFirstLetter(value: string | undefined) {
    if (!value) return value
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }

  changePinDialog() {
    const dialogRef = this.matDialog.open(ChangePinDialogComponent, {
      data: {user: this.currentUser},
      width: '500px',
    })
  }

}
