import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableFull } from 'src/app/core/models/table.model';
import { TableService } from 'src/app/core/services/table.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-edit-table-dialog',
  templateUrl: './edit-table-dialog.component.html',
  styleUrl: './edit-table-dialog.component.scss'
})
export class EditTableDialogComponent implements OnInit, OnDestroy {
  editTableForm: FormGroup
  currentTable!: TableFull

  constructor(
    public dialogRef: MatDialogRef<EditTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {tables: TableFull[]},
    private formBuilder: FormBuilder,
    private tableService: TableService,
    private snackbarService: SnackbarService,
  ) {
    this.editTableForm = this.formBuilder.group({
      tableNumber: new FormControl({value: '', disabled: true}, [Validators.required]),
      numberOfPeople: new FormControl({value: '', disabled: true}, [Validators.required]),
    })
  }

  ngOnInit() {
    if (this.data.tables.length > 0) {
      const firstTable = this.data.tables[0]
      this.fillForm(firstTable)
    }
  }

  ngOnDestroy() {
    this.tableService.reloadTables()
    this.dialogRef.close()
  }

  fillForm(table: TableFull) {
    this.editTableForm.disable()
    this.editTableForm.get("tableNumber")?.setValue(table.tableNumber);
    this.editTableForm.get("numberOfPeople")?.setValue(table.numberOfPeople);
    this.currentTable = table
  }

  editForm() {
    this.editTableForm.enable()
  }

  saveChanges() {
    const index = this.data.tables.findIndex(t => t.id === this.currentTable.id)
    if (index >= 0) {
      this.data.tables[index].tableNumber = this.editTableForm.get('tableNumber')?.value
      this.data.tables[index].numberOfPeople = this.editTableForm.get('numberOfPeople')?.value
    }
  }

  cancelEdit() {
    this.editTableForm.disable()
  }

  deleteTable() {
    this.tableService.deleteTable(this.currentTable.id).subscribe({
      next: () => {
        this.snackbarService.snackbarSuccess(`Removed Table ${this.currentTable.tableNumber}`, 'Done')
        this.removeTableFromArray(this.currentTable.id)
      },
      error: (err) => {}
    })
  }

  removeTableFromArray(id: number) {
    this.data.tables = this.data.tables.filter(t => t.id !== id)
    this.fillForm(this.data.tables[0])
  }

}
