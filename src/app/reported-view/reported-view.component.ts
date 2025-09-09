import { Component, inject } from '@angular/core';
import { GlobalService } from '../global.service';
import { RequestService } from '../request.service';

interface Report {
  text:string,
  postId:string,
  commentId:string
}

@Component({
  selector: 'app-reported-view',
  imports: [],
  templateUrl: './reported-view.component.html',
  styleUrl: './reported-view.component.css'
})
export class ReportedViewComponent {
  globals = inject(GlobalService);
  requests = inject(RequestService);
  reports!:Report[];

  ngOnInit(){
    this.refresh();
  }

  deletePost(postId:string){
    this.requests.deletePost(postId, this.globals.getJwtHeader()!).subscribe({next:(data)=>this.refresh()});
  }

  deleteComment(commentId:string){
    this.requests.deleteComment(commentId, this.globals.getJwtHeader()!).subscribe({next:(data)=>this.refresh()});
  }

  ignorePostReport(postId:string){
    this.requests.ignorePostReport(postId, this.globals.getJwtHeader()!).subscribe({next:(data)=>this.refresh()});
  }

  ignoreCommentReport(commentId:string){
    this.requests.ignoreCommentReport(commentId, this.globals.getJwtHeader()!).subscribe({next:(data)=>this.refresh()});
  }

  refresh(){
    this.reports = [];
    this.requests.getReports(this.globals.getJwtHeader()!).subscribe({next:(data:Report[])=>this.reports=data});

  }
}