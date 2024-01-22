import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserAddRequest, UserRolesEnum } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

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
    private snackbar: MatSnackBar
  ) {
    this.addUserForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
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
        this.snackbar.open(`User "${data.firstname} ${data.lastname}" added`, 'Done', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        this.dialogRef.close()
      },
      error: (err) => {
        this.snackbar.open(`Error occred: ${err}`, 'Try Again!', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    })
  }

}
