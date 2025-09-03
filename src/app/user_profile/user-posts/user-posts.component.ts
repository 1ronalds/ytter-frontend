import { Component, inject, Input } from '@angular/core';
import { RequestService } from '../../request.service';
import { PostComponent } from '../../post/post.component';
import { GlobalService } from '../../global.service';

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
  selector: 'app-user-posts',
  imports: [PostComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent {
  @Input() username!:string;
  requestService = inject(RequestService);
  globals = inject(GlobalService);
  posts?: Post[];

  ngOnInit(){
    this.loadPosts();
  }

  ngOnChanges(){
    this.loadPosts();
  }
  
  loadPosts(){
    this.requestService.fetchPostsByUser(this.username,this.globals.loggedIn() ? this.globals.getJwtHeader() : null).subscribe({next:(data:Post[])=>{this.posts=data}})
  }
}
