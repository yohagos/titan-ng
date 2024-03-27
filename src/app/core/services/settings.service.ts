import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Settings } from '../models/settings.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({})
  settings: Observable<Settings> = this.settingsSubject.asObservable();

  updatedSettings = new Subject<boolean>()

  constructor(
    private readonly http: HttpClient,
    private snackbarService: SnackbarService
  ) {

   }

  // BehaviorSubject functions
  getSettings() {
    this.loadSettings().subscribe(data => {
      if (data) {
        this.settingsSubject.next(data)
      }
    })
  }

  getUpdatedSettingsObservable() {
    return this.updatedSettings.asObservable()
  }

  adjustSettings(settings: Settings) {
    this.editSettings(settings).subscribe({
      next: (data) => {
        this.updatedSettings.next(true)
        this.settingsSubject.next(data)
        this.snackbarService.snackbarSuccess('Updated Settings', 'Done')
      },
      error: (err) => {
        this.snackbarService.snackbarError(err, 'Try Again!')
        this.updatedSettings.next(false)
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
