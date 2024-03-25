import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableAdd } from 'src/app/core/models/table.model';

@Component({
  selector: 'app-add-table-dialog',
  templateUrl: './add-table-dialog.component.html',
  styleUrl: './add-table-dialog.component.scss'
})
export class AddTableDialogComponent {
  addTableForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddTableDialogComponent>,
    public _snackbar: MatSnackBar
  ) {
    this.addTableForm = this.formBuilder.group({
      tableNumber: new FormControl('', Validators.required),
      seats: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.addTableForm.valid) {
      const table: TableAdd = {
        numberOfPeople: this.addTableForm.get('seats')?.value,
        tableNumber: this.addTableForm.get('tableNumber')?.value,
        positionX: 1,
        positionY: 1
      }
      this.dialogRef.close(table)
    }
  }

}
