import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { showToastError, showToastSuccess, showToastWarning} from 'src/app/toast-message/toastr';
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
    private authService: AuthService,
    private toastService: ToastrService,
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = this.authService.getTokenCookie();
      if(token){
        this.router.navigate(['/manage/dashboard']);
        showToastWarning(this.toastService, 'You are logged in!');
      }
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
        this.authService.setTokenCookie(response.token)
        showToastSuccess(this.toastService, 'Login Success!');
        this.router.navigate(['/manage/dashboard']);
      },
      (error) => {
        if (error.status === 404) {
          showToastError(this.toastService, 'Email does not exist. Please check your email.');
        } else if (error.status === 401) {
          showToastError(this.toastService, 'Incorrect password. Please check your password.');
        } else {
          showToastError(this.toastService, 'Internal server error');
        }
      }
    );
  }
}
