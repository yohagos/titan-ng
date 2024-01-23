import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserAddRequest, UserRolesEnum } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent implements OnInit {
  addUserForm: FormGroup
  roles: string[] = []

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private snackbarService: SnackbarService
  ) {
    this.addUserForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      pin: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.roles = Object.keys(UserRolesEnum).filter((item) => {
      return isNaN(Number(item))
    })
  }

  addUserCall() {
    let request: UserAddRequest = this.addUserForm.value
    this.userService.addNewUser(request).subscribe({
      next: (data: User) => {
        this.snackbarService.snackbarSuccess(`User "${data.firstname} ${data.lastname}" added`, 'Done')
        this.dialogRef.close()
      },
      error: (err) => {
        this.snackbarService.snackbarError(`Error occred: ${err}`, 'Try Again!')
      }
    })
  }

}
