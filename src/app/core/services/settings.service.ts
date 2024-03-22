import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemePalette } from "@angular/material/core";

import { Settings } from '../models/settings.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({})
  settings: Observable<Settings> = this.settingsSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private snackbarService: SnackbarService
  ) {

   }

  // BehaviorSubject functions
  getSettings() {
    this.loadSettings().subscribe(data => {
      this.settingsSubject.next(data)
    })
  }

  adjustSettings(settings: Settings) {
    this.editSettings(settings).subscribe({
      next: (data) => {
        this.settingsSubject.next(data)
        this.snackbarService.snackbarSuccess('Updated Settings', 'Done')
      },
      error: (err) => {
        this.snackbarService.snackbarError(err, 'Try Again!')
      }
    })
  }

  // Backend Calls
  loadSettings() {
    return this.http.get<Settings>('settings')
  }

  editSettings(settings: Settings) {
    return this.http.put<Settings>('settings/edit', settings)
  }
}
