import { Component } from '@angular/core';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'titan-ng';

  constructor(
    private settingsService: SettingsService
  ) {
    this.settingsService.applyColorScheme()
  }
}
