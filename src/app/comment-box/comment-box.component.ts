import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RequestService } from '../request.service';
import { FormsModule } from '@angular/forms';


interface Comment {
  id: number,
  name: string,
  username: string,
  text: string,
  likes: number,
  liked: boolean,
  reyeets?: number,
  reyeeted?: boolean,
  replies: number,
  time: string
}

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
  standalone: true,
  selector: 'app-comment-box',
  imports: [FormsModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent {
  @Input() openedPostData!:Post;
  openedCommentData!: Comment[];
  @Output() close = new EventEmitter<void>();
  requestService = inject(RequestService);
  openedCommentIdList: number[] = [];
  comments!:Comment[];
  openMenu:number = -1;
  myComment:string = "";
  charlen:number = 0;
  report:boolean = false;

  ngOnInit(){
    if(this.openedCommentIdList.length === 0){
      this.comments = this.requestService.getCommentsToPost(this.openedPostData.postId);
    } else {
      this.comments = this.requestService.getCommentsToComment(this.openedCommentIdList[this.openedCommentIdList.length-1]);
    }
  }

  openComment(commentId:number){
    for(const comment of this.comments){
      if(comment.id === commentId){
        this.openedCommentData.push(comment);
        break;
      }
    }
    this.openedCommentIdList.push(commentId);
    this.ngOnInit();
  }

  back(){
    if(this.openedCommentIdList.length > 0){
      this.openedCommentData.pop();
      this.openedCommentIdList.pop();
      this.ngOnInit();
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
}
