import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginCredentials } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.loginForm = formBuilder.group({
      email: new FormControl('david@david.com', [Validators.required, Validators.email]),
      password: new FormControl('david', Validators.required)
    })
  }

  clear() {
    this.loginForm.get('email')?.setValue('')
    this.loginForm.get('password')?.setValue('')
    this.loginForm.markAsUntouched()
  }

  login() {
    let credentials: LoginCredentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.userService.login(credentials).subscribe({
      next: () => {
        void this.router.navigate(['/nav/table'])
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  toRegister() {
    this.router.navigate(['/register'])
  }

}
