import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { RequestService } from '../../src/app/request.service';
import { GlobalService } from '../../src/app/global.service';
import { PostComponent } from '../../src/app/post/post.component';

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
  selector: 'app-my-reyeets-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './my-reyeets-view.component.html',
  styleUrl: './my-reyeets-view.component.css'
})
export class MyReyeetsViewComponent {
  requestService = inject(RequestService);
  globals = inject(GlobalService);
  reyeets!:Post[];

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    this.requestService.fetchReyeetsByUser(this.globals.username(), this.globals.getJwtHeader()).subscribe({next: (data:Post[]) => this.reyeets = data});
  }
}
