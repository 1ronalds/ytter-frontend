import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { PostserviceService } from '../../src/app/postservice.service';
import { PostComponent } from '../../src/app/post/post.component';
import { CommentBoxComponent } from '../../src/app/comment-box/comment-box.component';

interface Post {
  id: number,
  name: string,
  username: string,
  text: string,
  likes: number,
  liked: boolean,
  reyeets: number,
  reyeeted: boolean,
  replies: number,
  time: string
}

@Component({
  selector: 'app-top-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './top-view.component.html',
  styleUrl: './top-view.component.css'
})
export class TopViewComponent {
  postService = inject(PostserviceService);
  posts:Post[] = this.postService.getPosts();
}
