import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get passwordControl() {
    return this.userForm.get('password');
  }

  handleLogin() {
    const formValues = this.userForm.value;
    const email = formValues.email;
    const password = formValues.password;
    this.authService.login({email, password}).subscribe(
      (response) => {
        console.log('Token:', response.token);
        this.authService.setTokenCookie(response.token);
        this.router.navigate(['/manage/dashboard']);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
