import { Component, inject, Input } from '@angular/core';
import { GlobalService } from '../../global.service';
import { RequestService } from '../../request.service';
import { Router } from '@angular/router';
import { CreatePostBtnComponent } from '../../create-post-btn/create-post-btn.component';

interface ProfilePublicData {
  username: string,
  name: string
}


@Component({
  selector: 'app-user-following',
  imports: [CreatePostBtnComponent],
  templateUrl: './user-following.component.html',
  styleUrl: './user-following.component.css'
})
export class UserFollowingComponent {
  @Input() username!:string;
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  following!:ProfilePublicData[];
  router = inject(Router);

  ngOnInit(){
    this.requestService.fetchFollowingOfUser(this.username).subscribe({next:(data:ProfilePublicData[])=>{this.following = data}})
  }

  openUser(username:string){
    this.router.navigate(['/user', username]);
  }
}
