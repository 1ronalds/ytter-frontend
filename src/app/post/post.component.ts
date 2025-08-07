import { Component, Input } from '@angular/core';
import { CommentBoxComponent } from '../comment-box/comment-box.component';

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
  selector: 'app-post',
  imports: [CommentBoxComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!:Post;
  openMenu:boolean = false;
  report:boolean = false;
  openedComment:boolean = false;

  toggleReport(){
    this.report = !this.report;
  }
  
  toggleMenu(){
    this.openMenu = !this.openMenu;
  }

  reportpost(){
    this.report = !this.report;
  }
}
