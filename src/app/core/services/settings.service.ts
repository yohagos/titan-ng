import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({})
  settings: Observable<Settings> = this.settingsSubject.asObservable();

  constructor(
    private readonly http: HttpClient
  ) { }

  // BehaviorSubject functions
  getSettings() {
    this.loadSettings().subscribe(data => {
      this.settingsSubject.next(data)
    })
  }

  adjustSettings(settings: Settings) {
    this.settingsSubject.next(settings)
  }

  // Backend Calls
  loadSettings() {
    return this.http.get<Settings>('settings')
  }

  editSettings(settings: Settings) {
    return this.http.put<Settings>('settings/edit', settings)
  }
}
