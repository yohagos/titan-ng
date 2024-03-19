import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Settings } from 'src/app/core/models/settings.model';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements AfterViewInit {
  settings!: Settings
  settings$ = this.settingsService.settings

  settingsForm: FormGroup

  editMode = true

  primaryColor!: string
  accentColor!: string
  warnColor!: string

  constructor(
    private settingsService: SettingsService,
    private fb: FormBuilder
  ) {
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

  ngAfterViewInit() {
      this.settings$.subscribe(data => {
        if (Object.keys(data).length !== 0) {
          this.editMode = !this.editMode
        }
      })
  }

  editing() {
    this.editMode = !this.editMode
    this.updateFormControls()
  }

  updateFormControls() {
    const controls = Object.keys(this.settingsForm.controls)
    for (const controlName of controls) {
      const control = this.settingsForm.get(controlName)
      if (control) {
        this.editMode ? control.disable() : control.enable()
      }
    }
  }

  colors() {
    console.log(this.primaryColor)
    console.log(this.accentColor)
    console.log(this.warnColor)
  }

}
