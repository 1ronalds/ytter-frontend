import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { GlobalService } from '../global.service';
import { TimePipe } from '../time.pipe';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { env } from '../environment'

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
    reyeeted?: boolean,
    reyeetedByName?: string
}

@Component({
  selector: 'app-post',
  imports: [CommentBoxComponent, TimePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!:Post;
  @Output() postDeleted = new EventEmitter<void>();
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  openMenu:boolean = false;
  report:boolean = false;
  delete:boolean = false;
  openedComment:boolean = false;
  router = inject(Router);
  server = env.server;

  constructor(){
    effect(()=>{
      if(!this.globals.loggedIn()){
        this.post.liked = false;
        this.post.reyeeted = false;
      }
    })
  }

  toggleReport(){
    if(this.globals.loggedIn()){
      this.report = !this.report;
    }
  }
  
  toggleMenu(){
    this.openMenu = !this.openMenu;
  }

  reportpost(){
    this.requestService.reportPost(this.post.postId, this.globals.getJwtHeader()!).subscribe();
    this.report = !this.report;
  }

  likePost(){
    console.log(this.post.postId);
    if(this.globals.loggedIn()){
      if(!this.post.liked){
        this.requestService.likePost(this.post.postId, this.globals.getJwtHeader()!).subscribe({next:(data)=>console.log("liked post")});
        this.post.liked = true;
        if(this.post.likeCount !== undefined){
          this.post.likeCount++;
        } else {
          this.post.likeCount = 1;
        }
      } else {
        this.requestService.unlikePost(this.post.postId, this.globals.getJwtHeader()!).subscribe({next:(data)=>console.log("unliked post")});
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
        this.requestService.reyeetPost(this.post.postId, this.globals.getJwtHeader()!).subscribe({next:(data)=>console.log("reyeeted post")});;
        this.post.reyeeted = true;
        if(this.post.reyeetCount !== undefined){
          this.post.reyeetCount++;
        } else {
          this.post.reyeetCount = 1;
        }
      } else {
        this.requestService.unReyeetPost(this.post.postId, this.globals.getJwtHeader()!).subscribe({next:(data)=>console.log("unreyeeted post")});;
        this.post.reyeeted = false;
        if(this.post.reyeetCount !== undefined){
          this.post.reyeetCount--;
        }
      }
    } else {
      console.log("Must be logged in");
    }
  }

  openUserProfile(username:string){
    if(username !== this.globals.username()){
      this.router.navigate(['/user', username]);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  deletePost(){
    this.requestService.deletePost(this.post.postId, this.globals.getJwtHeader()!).subscribe({next: (data)=>this.postDeleted.emit()});
  }

}