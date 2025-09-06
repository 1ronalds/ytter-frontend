import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserPostsComponent } from '../user-posts/user-posts.component';
import { UserReyeetsComponent } from '../user-reyeets/user-reyeets.component';
import { UserFollowersComponent } from '../user-followers/user-followers.component';
import { UserFollowingComponent } from '../user-following/user-following.component';
import { RequestService } from '../../request.service';
import { GlobalService } from '../../global.service';
import { CreatePostBtnComponent } from '../../create-post-btn/create-post-btn.component';

@Component({
  selector: 'app-user-data',
  imports: [RouterLink, RouterLinkActive, UserPostsComponent, UserReyeetsComponent, UserFollowersComponent, UserFollowingComponent, CreatePostBtnComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  username:string = "";
  tab:string = "";
  userExists?:boolean;
  requestService = inject(RequestService);
  globals = inject(GlobalService);
  following?:boolean;
  router = inject(Router);
  navigated = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')!;
      this.requestService.getDoesUserExist(this.username).subscribe({next: (data:string)=> {data === "false" ? this.userExists = false : this.userExists = true }})
      if(this.globals.loggedIn()){
        this.requestService.getIsFollowing(this.username, this.globals.getJwtHeader()).subscribe({next: (data:string)=>{data === "true" ? this.following = true : this.following = false}})
      }
    })
    this.route.data.subscribe(data => {
      this.tab = data['tab'];
    });
  }

  follow(){
    this.requestService.follow(this.username, this.globals.getJwtHeader()).subscribe();
    this.following = true;
  }

  unfollow(){
    this.requestService.unfollow(this.username, this.globals.getJwtHeader()).subscribe();
    this.following = false;
  }
}
