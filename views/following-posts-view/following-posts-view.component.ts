import { Component } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostComponent } from "../../src/app/create-post/create-post.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';

@Component({
  selector: 'app-following-posts-view',
  imports: [HeaderComponent, CreatePostBtnComponent],
  templateUrl: './following-posts-view.component.html',
  styleUrl: './following-posts-view.component.css'
})
export class FollowingPostsViewComponent {
  showCreatePostBox:boolean=false;
}
