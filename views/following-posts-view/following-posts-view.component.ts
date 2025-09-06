import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { RequestService } from '../../src/app/request.service';
import { GlobalService } from '../../src/app/global.service';
import { PostComponent } from '../../src/app/post/post.component';

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
    reyeeted?: boolean
}

@Component({
  selector: 'app-following-posts-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './following-posts-view.component.html',
  styleUrl: './following-posts-view.component.css'
})
export class FollowingPostsViewComponent {
  requestService = inject(RequestService);
  posts!:Post[];
  globals = inject(GlobalService);

  ngOnInit(){
    this.reloadPosts();
  }

  reloadPosts(){
    this.requestService.fetchFollowingFeed(this.globals.getJwtHeader()).subscribe({
      next: (data) => this.posts = data
    })
  }
  
}
