import { Component, inject, Input } from '@angular/core';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { GlobalService } from '../global.service';
import { TimePipe } from '../time.pipe';

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
  selector: 'app-post',
  imports: [CommentBoxComponent, TimePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!:Post;
  globals = inject(GlobalService);
  openMenu:boolean = false;
  report:boolean = false;
  openedComment:boolean = false;

  toggleReport(){
    if(this.globals.loggedIn()){
      this.report = !this.report;
    }
  }
  
  toggleMenu(){
    this.openMenu = !this.openMenu;
  }

  reportpost(){
    this.report = !this.report;
  }

  likePost(){
    if(this.globals.loggedIn()){
      if(!this.post.liked){
        this.post.liked = true;
        if(this.post.likeCount !== undefined){
          this.post.likeCount++;
        } else {
          this.post.likeCount = 1;
        }
      } else {
        this.post.liked = false;
        if(this.post.likeCount !== undefined){
          this.post.likeCount--;
        }
      }
    } else {
      console.log("Must be logged in");
    }
  }

  reyeetPost(){
    if(this.globals.loggedIn()){
      if(!this.post.reyeeted){
        this.post.reyeeted = true;
        if(this.post.reyeetCount !== undefined){
          this.post.reyeetCount++;
        } else {
          this.post.reyeetCount = 1;
        }
      } else {
        this.post.reyeeted = false;
        if(this.post.reyeetCount !== undefined){
          this.post.reyeetCount--;
        }
      }
    } else {
      console.log("Must be logged in");
    }
  }

}
