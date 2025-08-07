import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PostserviceService } from '../postservice.service';
import { FormsModule } from '@angular/forms';


interface Post {
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

@Component({
  standalone: true,
  selector: 'app-comment-box',
  imports: [FormsModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css'
})
export class CommentBoxComponent {
  @Input() openedPostData!:Post[];
  @Output() close = new EventEmitter<void>();
  postService = inject(PostserviceService);
  openedCommentIdList: number[] = [];
  comments!:Post[];
  openMenu:number = -1;
  myComment:string = "";
  charlen:number = 0;
  report:boolean = false;

  ngOnInit(){
    if(this.openedCommentIdList.length === 0){
      this.comments = this.postService.getCommentsToPost(this.openedPostData[0].id);
      console.log(this.comments);
    } else {
      this.comments = this.postService.getCommentsToComment(this.openedCommentIdList[this.openedCommentIdList.length-1]);
    }
  }

  openComment(commentId:number){
    for(const comment of this.comments){
      if(comment.id === commentId){
        this.openedPostData.push(comment);
        break;
      }
    }
    this.openedCommentIdList.push(commentId);
    this.ngOnInit();
  }

  back(){
    if(this.openedCommentIdList.length > 0){
      this.openedPostData.pop();
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
    this.openedPostData[this.openedPostData.length-1].liked = !this.openedPostData[this.openedPostData.length-1].liked;
  }

  reportPost(){

  }
}
