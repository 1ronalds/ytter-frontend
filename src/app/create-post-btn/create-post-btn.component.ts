import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-create-post-btn',
  imports: [CreatePostComponent],
  templateUrl: './create-post-btn.component.html',
  styleUrl: './create-post-btn.component.css'
})
export class CreatePostBtnComponent {
  showCreatePostBox:boolean=false;
  globals = inject(GlobalService);
  @Output() reloadPosts = new EventEmitter<void>();
}
