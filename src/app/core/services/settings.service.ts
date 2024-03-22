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
      this.applyColorScheme()
    })
  }

  adjustSettings(settings: Settings) {
    this.editSettings(settings).subscribe({
      next: (data) => {
        this.settingsSubject.next(data)
        this.applyColorScheme()
        this.snackbarService.snackbarSuccess('Updated Settings', 'Done')
      },
      error: (err) => {
        this.snackbarService.snackbarError(err, 'Try Again!')
      }
    })
  }

  // Settings functions
  applyColorScheme() {
    const settings = this.settingsSubject.value

    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor)
    }
    if (settings.accentColor) {
      document.documentElement.style.setProperty('--accent-color', settings.accentColor)
    }
    if (settings.warnColor) {
      document.documentElement.style.setProperty('--warn-color', settings.warnColor)
    }

    //settings.primaryColor ? document.documentElement.style.setProperty('--primary-color', settings.primaryColor) : null
    //settings.accentColor ? document.documentElement.style.setProperty('--accent-color', settings.accentColor) : null
    //settings.warnColor ? document.documentElement.style.setProperty('--warn-color', settings.warnColor) : null
  }

  // Backend Calls
  loadSettings() {
    return this.http.get<Settings>('settings')
  }

  editSettings(settings: Settings) {
    return this.http.put<Settings>('settings/edit', settings)
  }
}
