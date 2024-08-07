import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { response } from 'express';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  title!:string ;
  name!:string;
  email!:string;

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
       this.title = this.removePrefix(event.urlAfterRedirects);
      });
    this.title = this.removePrefix(this.router.routerState.snapshot.url);
    this.getInfoUser();
  }

  getInfoUser(){
    const id = this.authService.getIdFromToken()!;
    this.authService.getInfoUser(id).subscribe(
      (response) =>{
        this.name = response.Name;
        this.email = response.Email;  
    })
  }

  removePrefix(url: string): string {
    const prefix = '/manage/';
    let trimmedUrl = url.startsWith(prefix) ? url.substring(prefix.length) : url;
    const parts = trimmedUrl.split('/');
    if (parts.length > 1) {
      return `${parts[0]} Detail`;
    }
    return trimmedUrl;
  }

  openProfilePopup(){
    const profile = document.getElementById('profile') as HTMLElement;
    profile.classList.add('active')
  }

  redirectToHome(){
    this.router.navigate(['/manage/dashboard'])
  }
}
