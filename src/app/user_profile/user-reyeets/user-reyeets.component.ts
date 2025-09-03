import { Component, inject, Input } from '@angular/core';
import { GlobalService } from '../../global.service';
import { RequestService } from '../../request.service';
import { PostComponent } from '../../post/post.component';
import { CreatePostBtnComponent } from '../../create-post-btn/create-post-btn.component';

interface ProfilePublicData {
  username: string,
  name: string
}

interface Post {
    postId: string,
    profilePublicData: ProfilePublicData,
    imageId?: number,
    replyCount?: number,
    likeCount?: number,
    reyeetCount?: number,
    text: string,
    timestamp: string,
    liked?: boolean,
    reyeeted?: boolean,
    reyeetedByName?: string
}

@Component({
  selector: 'app-user-reyeets',
  imports: [PostComponent, CreatePostBtnComponent],
  templateUrl: './user-reyeets.component.html',
  styleUrl: './user-reyeets.component.css'
})
export class UserReyeetsComponent {
  @Input() username!:string;
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  reyeets?:Post[];

  ngOnInit(){
    this.requestService.fetchReyeetsByUser(this.username, this.globals.loggedIn() ? this.globals.getJwtHeader() : null).subscribe({next: (data:Post[]) => this.reyeets = data});
  }
}
