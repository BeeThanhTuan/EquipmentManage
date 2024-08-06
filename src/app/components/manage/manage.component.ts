import { Component } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  title!:string ;
  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
       this.title = this.removePrefix(event.urlAfterRedirects);
      });
    this.title = this.removePrefix(this.router.routerState.snapshot.url);
      
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
    this.router.navigate(['/dashboard'])
  }
}
