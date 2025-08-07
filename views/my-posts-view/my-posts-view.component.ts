import { Component } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';

@Component({
  selector: 'app-my-posts-view',
  imports: [HeaderComponent, CreatePostBtnComponent],
  templateUrl: './my-posts-view.component.html',
  styleUrl: './my-posts-view.component.css'
})
export class MyPostsViewComponent {

}
