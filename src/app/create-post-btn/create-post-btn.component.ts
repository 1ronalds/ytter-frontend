import { Component } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-create-post-btn',
  imports: [CreatePostComponent],
  templateUrl: './create-post-btn.component.html',
  styleUrl: './create-post-btn.component.css'
})
export class CreatePostBtnComponent {
  showCreatePostBox:boolean=false;
}
