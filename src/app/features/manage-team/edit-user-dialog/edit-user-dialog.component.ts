import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserBasic, UserRolesEnum } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UtilService } from './../../../shared/services/util.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent implements OnInit {
  hide = true
  editForm: FormGroup
  currentUser: UserBasic
  roles: string[] = []

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {user: UserBasic},
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private snackbarService: SnackbarService
  ) {
    this.currentUser = data.user
    this.editForm = this.formBuilder.group({
      firstname: new FormControl(data.user.firstname, Validators.required),
      lastname: new FormControl(data.user.lastname, Validators.required),
      email: new FormControl(data.user.email, [Validators.required, Validators.email]),
      pin: new FormControl(data.user.pin, Validators.required),
      role: new FormControl(this.utilService.capitalizeFirstLetter(data.user.role), Validators.required),
    })
  }

  ngOnInit() {
    this.roles = Object.keys(UserRolesEnum).filter((item) => {
      return isNaN(Number(item))
    })
  }

  editUser() {
    this.prepareData()
    this.userService.editUser(this.currentUser).subscribe({
      next: () => {
        this.snackbarService.snackbarSuccess(`Updated User ${this.currentUser.firstname} ${this.currentUser.lastname}`, 'Done')
        this.dialogRef.close()
      },
      error: (err) => {
        this.snackbarService.snackbarError(`Error occred: ${err}`, 'Try Again!')
      }
    })
  }

  prepareData() {
    Object.keys(this.editForm.controls).forEach(controlName => {
      const formControl = this.editForm.get(controlName);
      if (formControl && formControl.value !== this.currentUser[controlName as keyof UserBasic]) {
        this.currentUser[controlName] = formControl.value;
      }
    });
  }

}
