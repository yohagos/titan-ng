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
    //this.settingsSubject.pipe()
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
        this.applyColorScheme()
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  // Settings functions
  applyColorScheme() {
    const settings = this.settingsSubject.value
    console.log(settings)

    settings.primaryColor ? document.documentElement.style.setProperty('--primary-color', settings?.primaryColor.replace("'", '')) : console.log('primary')
    settings.accentColor ? document.documentElement.style.setProperty('--primary-color', settings?.accentColor.replace("'", '')) : console.log('accent')
    settings.warnColor ? document.documentElement.style.setProperty('--primary-color', settings?.warnColor.replace("'", '')) : console.log('warn')
  }

  // Backend Calls
  loadSettings() {
    return this.http.get<Settings>('settings')
  }

  editSettings(settings: Settings) {
    return this.http.put<Settings>('settings/edit', settings)
  }
}
