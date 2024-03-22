import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Settings } from 'src/app/core/models/settings.model';
import { SettingsService } from 'src/app/core/services/settings.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  settings$ = this.settingsService.settings

  settingsForm!: FormGroup
  editMode = true

  primaryColor!: string
  accentColor!: string
  warnColor!: string

  constructor(
    private settingsService: SettingsService,
    private fb: FormBuilder,
  ) {
    this.settingsService.getSettings()
    this.fillForm()
  }

  ngOnInit(): void {
    this.settingsService.loadSettings().subscribe((data) => {
      let currentData = data[0] as Settings
      if (currentData) {
        this.updateFormValues(currentData)
      }
    })
  }

  fillForm() {
    this.settingsForm = this.fb.group({
      companyName: new FormControl({value: '', disabled: this.editMode}, Validators.required),
      streetName: new FormControl({value: '', disabled: this.editMode}, Validators.required),
      streetNumber: new FormControl({value: '', disabled: this.editMode}, Validators.required),
      postalCode: new FormControl({value: '', disabled: this.editMode}, Validators.required),
      cityName: new FormControl({value: '', disabled: this.editMode}, Validators.required),
      customColorTheme: new FormControl({value: false, disabled: this.editMode}),
      timerLockScreen: new FormControl({value: '', disabled: this.editMode}),
    })
  }

  editing() {
    this.editMode = !this.editMode
    this.updateEditMode()
  }

  updateEditMode() {
    const controls = Object.keys(this.settingsForm.controls)
    for (const controlName of controls) {
      const control = this.settingsForm.get(controlName)
      if (control) {
        this.editMode ? control.disable() : control.enable()
      }
    }
  }

  updateFormValues(data: Settings) {
    const keys = Object.keys(this.settingsForm.controls)
    for (const key of keys) {
      if (data[key]) {
        this.settingsForm.get(key)?.setValue(data[key])
      }
    }
    if (data.customColorTheme) {
      data.primaryColor ? this.primaryColor = data.primaryColor : this.primaryColor = ''
      data.accentColor ? this.accentColor = data.accentColor : this.accentColor = ''
      data.warnColor ? this.warnColor = data.warnColor : this.warnColor = ''
    }
  }

  addColorsToSetting(setting: Settings) {
    this.primaryColor !== '' || this.primaryColor !== null ? setting.primaryColor = this.primaryColor : delete setting.primaryColor
    this.accentColor !== '' || this.accentColor !== null ? setting.accentColor = this.accentColor : delete setting.accentColor
    this.warnColor !== '' || this.warnColor !== null ? setting.warnColor = this.warnColor : delete setting.warnColor
    return setting
  }

  saveSettings() {
    let settings: Settings = {}
    const formValues = this.settingsForm.value

    for(const key in formValues) {
      if (formValues[key] !== '' && formValues[key] !== null && formValues[key] !== undefined) {
        settings[key] = formValues[key]
      } else {
        settings[key] = ''
      }
    }
    
    if (settings.customColorTheme) {
      settings = this.addColorsToSetting(settings)
    }
    this.settingsService.adjustSettings(settings)
  }
}
