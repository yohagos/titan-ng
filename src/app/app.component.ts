import { Component } from '@angular/core';
import { SettingsService } from './core/services/settings.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'titan-ng';

  currentTheme: any

  constructor(
    private settingsService: SettingsService,
    private themeService: ThemeService,
  ) {
    this.settingsService.getSettings()
    this.themeService.loadTheme()
  }

}
