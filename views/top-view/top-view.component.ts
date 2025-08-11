import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { RequestService } from '../../src/app/request.service';
import { PostComponent } from '../../src/app/post/post.component';

interface ProfileDataPublic {
  username: string,
  name: string
}

interface Post {
  postId: number,
    profileDataPublic: ProfileDataPublic,
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
  selector: 'app-top-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './top-view.component.html',
  styleUrl: './top-view.component.css'
})
export class TopViewComponent {
  requestService = inject(RequestService);
  posts!:Post[];

  ngOnInit(){
    this.requestService.fetchTopPostsThisWeek().subscribe({
      next: (data) => {
        this.posts = data;
        console.log(data);
      }
    })
  }

}
