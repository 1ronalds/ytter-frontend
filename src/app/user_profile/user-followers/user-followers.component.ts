import { Component, inject, Input } from '@angular/core';
import { CreatePostBtnComponent } from '../../create-post-btn/create-post-btn.component';
import { GlobalService } from '../../global.service';
import { RequestService } from '../../request.service';
import { Router } from '@angular/router';

interface ProfilePublicData {
  username: string,
  name: string
}

@Component({
  selector: 'app-user-followers',
  imports: [CreatePostBtnComponent],
  templateUrl: './user-followers.component.html',
  styleUrl: './user-followers.component.css'
})
export class UserFollowersComponent {
  @Input() username!:string;
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  followers!:ProfilePublicData[];
  router = inject(Router);

  ngOnInit(){
    this.requestService.fetchFollowersOfUser(this.username).subscribe({next:(data:ProfilePublicData[])=>{this.followers = data}})
  }

  ngOnChanges(){
    this.requestService.fetchFollowersOfUser(this.username).subscribe({next:(data:ProfilePublicData[])=>{this.followers = data}})
  }

  openUser(username:string){
    this.router.navigate(['/user', username]);
  }
}
