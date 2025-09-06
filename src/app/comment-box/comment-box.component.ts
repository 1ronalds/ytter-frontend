import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RequestService } from '../request.service';
import { FormsModule } from '@angular/forms';
import { TimePipe } from '../time.pipe';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';



interface Comment {
  commentId: string,
  profilePublicData: ProfilePublicData;
  rootPostId: string;
  replyToCommentId: string;
  comment: string,
  likeCount: number,
  liked: boolean,
  replyCount: number,
  timestamp: string
}

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

interface NewComment {
  rootPostId:string,
  replyToCommentId:string|null,
  comment:string
}

@Component({
  standalone: true,
  selector: 'app-comment-box',
  imports: [FormsModule, TimePipe],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent {
  @Input() openedPostData!:(Post|Comment)[];
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  requestService = inject(RequestService);
  globalService = inject(GlobalService);
  openedCommentIdList: string[] = [];
  comments!:Comment[];
  openMenu:number = -1;
  myComment:string = "";
  report:boolean = false;
  router = inject(Router);
  deleteBox:boolean = false;
  deleteMain:boolean|null = null;
  deleteCommentId:string|null = null;

  ngOnInit(){
    this.loadComments();
  }

  loadComments(){
    if(this.openedCommentIdList.length === 0){
      this.requestService.getCommentsToPost((this.openedPostData[0] as Post).postId, this.globalService.getJwtHeader()).subscribe({
        next: (data) => this.comments = data
      });
    } else {
      this.requestService.getCommentsToComment(this.openedCommentIdList[this.openedCommentIdList.length-1], this.globalService.getJwtHeader()).subscribe({
        next: (data) => this.comments = data
      });
    }
  }

  openComment(commentId:string){
    for(const comment of this.comments){
      if(comment.commentId === commentId){
        this.openedPostData.push(comment);
        break;
      }
    }
    this.openedCommentIdList.push(commentId);
    this.loadComments();
  }

  back(){
    if(this.openedCommentIdList.length > 0){
      this.openedPostData.pop();
      this.openedCommentIdList.pop();
      this.loadComments();
    } else {
      this.close.emit();
    }
  }

  toggleMenu(id:number){
    if(this.openMenu === -1){
      this.openMenu = id;
    } else {
      this.openMenu = -1;
    }
  }

  toggleLikeOpenedPost(){
    console.log("ok");
  }

  reportPost(){

  }

  get charlen():number{
    return this.myComment.length;
  }

  postComment(form:any){
    if(form.value.comment.length > 0){
      if(this.openedPostData.length === 1){
        let comment:NewComment = {rootPostId:(this.openedPostData[0] as Post).postId, replyToCommentId: null, comment: form.value.comment };
        this.requestService.postCommentToPost(comment, this.globalService.getJwtHeader()).subscribe({next: (data)=>{
          this.loadComments();
          (this.openedPostData[0] as Post | undefined)!.replyCount =
                ((this.openedPostData[0] as Post | undefined)?.replyCount ?? 0) + 1;
      }});
      } else {
        let comment:NewComment = {rootPostId:(this.openedPostData[0] as Post).postId, replyToCommentId:  (this.openedPostData[this.openedPostData.length-1] as Comment).commentId, comment: form.value.comment };
        this.requestService.postCommentToComment(comment, this.globalService.getJwtHeader()).subscribe({next: (data)=>{
          this.loadComments();
          (this.openedPostData[0] as Post | undefined)!.replyCount =
                ((this.openedPostData[0] as Post | undefined)?.replyCount ?? 0) + 1;
        }});
      }
      this.myComment = '';
    }
  }

  likePost(){
    if(this.globalService.loggedIn()){
      if(!this.openedPostData[0].liked){
        this.requestService.likePost((this.openedPostData[0] as Post).postId, this.globalService.getJwtHeader()).subscribe({next:(data)=>console.log("liked post")});
        this.openedPostData[0].liked = true;
        if(this.openedPostData[0].likeCount !== undefined){
          this.openedPostData[0].likeCount++;
        } else {
          this.openedPostData[0].likeCount = 1;
        }
      } else {
        this.requestService.unlikePost((this.openedPostData[0] as Post).postId, this.globalService.getJwtHeader()).subscribe({next:(data)=>console.log("unliked post")});
        this.openedPostData[0].liked = false;
        if(this.openedPostData[0].likeCount !== undefined){
          this.openedPostData[0].likeCount--;
        }
      }
    } else {
      console.log("Must be logged in");
    }
  }

  likeComment(id:string){
    if(this.globalService.loggedIn()){
      let comment_in_arr:number = 0;
      for(let comment of this.comments){
        if(comment.commentId === id){
          break;
        }
        comment_in_arr++;
      }
      if(!this.comments[comment_in_arr].liked){
        this.requestService.likeComment((this.comments[comment_in_arr] as Comment).commentId, this.globalService.getJwtHeader()).subscribe({next:(data)=>console.log("liked comment")});
        this.comments[comment_in_arr].liked = true;
        if(this.comments[comment_in_arr].likeCount !== undefined){
          this.comments[comment_in_arr].likeCount++;
        } else {
          this.comments[comment_in_arr].likeCount = 1;
        }
      } else {
        this.requestService.unlikeComment((this.comments[comment_in_arr] as Comment).commentId, this.globalService.getJwtHeader()).subscribe({next:(data)=>console.log("unliked comment")});
        this.comments[comment_in_arr].liked = false;
        if(this.comments[comment_in_arr].likeCount !== undefined){
          this.comments[comment_in_arr].likeCount--;
        }
      }
    } else {
      console.log("Must be logged in");
    }
  }

  reyeetPost(){
    if(this.globalService.loggedIn()){
      if(!(this.openedPostData[0] as Post).reyeeted){
        this.requestService.reyeetPost((this.openedPostData[0] as Post).postId, this.globalService.getJwtHeader()).subscribe({next:(data)=>console.log("reyeeted post")});
        (this.openedPostData[0] as Post).reyeeted = true;
        if((this.openedPostData[0] as Post).reyeetCount !== undefined){
          (this.openedPostData[0] as Post).reyeetCount = (this.openedPostData[0] as Post).reyeetCount! + 1;
        } else {
          (this.openedPostData[0] as Post).reyeetCount = 1;
        }
      } else {
        this.requestService.unReyeetPost((this.openedPostData[0] as Post).postId, this.globalService.getJwtHeader()).subscribe({next:(data)=>console.log("unreyeeted post")});
        (this.openedPostData[0] as Post).reyeeted = false;
        if((this.openedPostData[0] as Post).reyeetCount !== undefined){
          (this.openedPostData[0] as Post).reyeetCount = (this.openedPostData[0] as Post).reyeetCount! - 1;
        }
      }
    } else {
      console.log("Must be logged in");
    }
  }

  isComment(item: Post | Comment): item is Comment {
    return (item as Comment).comment !== undefined;
  }

  getDisplayText(item: Post | Comment): string {
    if(this.isComment(item)) {
      return item.comment;
    }
    return item.text;
  }

  isPost(item: Post | Comment): item is Post {
    return (item as Post).reyeeted !== undefined;
  }

  openUserProfile(username:string){
    if(username !== this.globalService.username()){
      this.router.navigate(['/user', username]);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  delete(){
    if(this.deleteMain === true){
      if(this.openedCommentIdList.length === 0){
        this.requestService.deletePost((this.openedPostData[0] as Post).postId, this.globalService.getJwtHeader()).subscribe({
          next:(data)=>{
            this.deleteBox = false;
            this.deleteMain = null;
            this.deleteCommentId = null;
            this.refresh.emit();
            this.openedPostData[0].replyCount && this.openedPostData[0].replyCount--;
            this.back();
          }
        });
      } else {
        this.requestService.deleteComment((this.openedPostData[this.openedPostData.length-1] as Comment).commentId, this.globalService.getJwtHeader()).subscribe({
          next:(data)=>{
            this.deleteBox = false;
            this.deleteMain = null;
            this.deleteCommentId = null;
            this.back();
          }
        });

      }

    } else {
      this.deleteCommentId !== null ? this.requestService.deleteComment(this.deleteCommentId, this.globalService.getJwtHeader()).subscribe({
        next: (data)=>{
          this.deleteBox = false;
          this.deleteMain = null;
          this.deleteCommentId = null;
          this.loadComments();
          this.openedPostData[this.openedPostData.length - 1]!.replyCount =
                (this.openedPostData[this.openedPostData.length - 1]!.replyCount ?? 1) - 1;
        }
      }) : "";
    }
  }
}