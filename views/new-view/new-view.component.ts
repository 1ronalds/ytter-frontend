import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { PostComponent } from '../../src/app/post/post.component';
import { RequestService } from '../../src/app/request.service';
import { GlobalService } from '../../src/app/global.service';

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
  selector: 'app-new-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './new-view.component.html',
  styleUrl: './new-view.component.css'
})
export class NewViewComponent {
  requestService = inject(RequestService);
  posts!:Post[];
  globals = inject(GlobalService);

  ngOnInit(){
    this.reloadPosts();
  }

  reloadPosts(){
    this.requestService.fetchNewPosts(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null).subscribe({
      next: (data) => this.posts = data
    })
  }
}
