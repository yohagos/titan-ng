import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  loadSettings() {
    return this.http.get<Settings>('settings')
  }

  editSettings() {
    return this.http.get('settings/edit')
  }
}
