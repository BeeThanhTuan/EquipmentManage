import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { showToastSuccess, showToastError } from 'src/app/toast-message/toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profiler',
  templateUrl: './profiler.component.html',
  styleUrls: ['./profiler.component.css'],
})
export class ProfilerComponent {
  @Input() nameUser!: string ;
  @Input() emailUser!: string ;
  newName!:string;

  constructor(private router: Router, private authService: AuthService,private toastService: ToastrService,private location: Location) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nameUser']) {
      this.newName = this.nameUser;
    }
  }

  handleLogout() {
    const token = this.authService.getTokenCookie();
    console.log(token);
    if (token) {
      this.authService.removeTokenCookie();
      this.router.navigate(['/login']);
      showToastSuccess(this.toastService, 'You are login success!');
    }
  }

  updateInfoProfile() {
      this.authService.updateName({email: this.emailUser, name: this.newName.trim()}).subscribe(
        () =>{
          showToastSuccess(this.toastService, 'Update name success!');
          window.location.reload();
        },
        (error) => {
          if (error.status === 404) {
            showToastError(this.toastService, 'Email does not exist. Please check your email.');
          } else {
            showToastError(this.toastService, 'Internal server error');
          }
        }
      )
  }

  toggleEditProfile() {
    const editProfile = document.getElementById('editProfile') as HTMLElement;
    const bntLogout = document.getElementById('logout') as HTMLElement;
    editProfile.classList.toggle('active');
    bntLogout.classList.toggle('active');
  }

  removeProfile() {
    const profile = document.getElementById('profile') as HTMLElement;
    if (profile.classList.contains('active')) {
      profile.classList.remove('active');
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
