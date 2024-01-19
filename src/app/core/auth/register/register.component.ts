import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RegisterCredentials } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true

  registerForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: new FormControl('David'),
      lastname: new FormControl('David'),
      email: new FormControl('david@david.com'),
      password: new FormControl('david'),
    })
  }

  clear() {
    this.registerForm.get('firstname')?.setValue('')
    this.registerForm.get('lastname')?.setValue('')
    this.registerForm.get('email')?.setValue('')
    this.registerForm.get('password')?.setValue('')
    this.registerForm.markAsUntouched()
  }

  register() {
    let registerCredentials: RegisterCredentials = {
      firstname: this.registerForm.get('firstname')?.value,
      lastname: this.registerForm.get('lastname')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }

    this.userService.register(registerCredentials).subscribe(
      () => {
        this.router.navigate(['/login'])
      }
    )
  }

  toLogin() {
    this.router.navigate(['/login'])
  }
}
