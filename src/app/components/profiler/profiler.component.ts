import { Component } from '@angular/core';

@Component({
  selector: 'app-profiler',
  templateUrl: './profiler.component.html',
  styleUrls: ['./profiler.component.css'],
})
export class ProfilerComponent {
  name: string = '';
  updateInfoProfile() {}

  toggleEditProfile(){
    const editProfile = document.getElementById('editProfile') as HTMLElement;
    editProfile.classList.toggle('active');
  }

  removeProfile(){
    const profile = document.getElementById('profile') as HTMLElement;
    if(profile.classList.contains('active')){
      profile.classList.remove('active')
    } 
  }
  stopPropagation(event: Event){
    event.stopPropagation();
  }

}
