import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDialogService } from '../shared/services/confirm-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserBasic } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrl: './manage-team.component.scss'
})
export class ManageTeamComponent implements OnInit {
  dataSource: any
  displayedColums = ['firstname', 'lastname', 'role', 'actions']
  @ViewChild(MatSort) sort!: MatSort

  loading = true
  filterText = ''

  constructor(
    private userService: UserService,
    private confirmService: ConfirmDialogService,
    private matDialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData()
  }

  // Table Functions

  loadData() {
    this.userService.loadUsers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort
        this.loading = false
      }
    )
  }

  capitalizeFirstLetter(value: string | undefined) {
    if (!value) return value
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clearFilter() {
    this.dataSource.filter = ''
    this.filterText = ''
  }

  // Add Users

  addUser() {
    this.matDialog.open(AddUserDialogComponent, {
      width: '600px'
    })
  }

  // 'Actions' Functions

  deleteUser(user: UserBasic) {
    this.confirmService.confirm().subscribe(
      (result) => {
        if (result) {
          this.userService.deleteUser(user.id).subscribe({
            next: () => {
              this.snackbar.open(`User "${user.firstname} ${user.lastname}" removed`, 'close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
              this.loadData()
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
    )
  }

}
