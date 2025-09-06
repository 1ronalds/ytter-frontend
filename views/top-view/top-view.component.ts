import { Component, effect, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { RequestService } from '../../src/app/request.service';
import { PostComponent } from '../../src/app/post/post.component';
import { GlobalService } from '../../src/app/global.service';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-top-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './top-view.component.html',
  styleUrl: './top-view.component.css'
})
export class TopViewComponent {
  requestService = inject(RequestService);
  posts!:Post[];
  globals = inject(GlobalService);

  constructor(private router: Router){
    effect(() => {
      if(this.globals.loggedIn() === false && this.router.url === '/top'){
        this.router.navigate(['/']);
      }
    })
  };


  reloadPosts(){
    if(this.router.url === '/top/this-week' || this.router.url === '/top' || this.router.url === '/'){
      this.requestService.fetchTopPostsThisWeek(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null).subscribe({
        next: (data) => {
          this.posts = data;
          console.log(data);
        }
      })
    } else {
      this.requestService.fetchTopPostsThisMonth(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null).subscribe({
        next: (data) => {
          this.posts = data;
          console.log(data);
        }
      })
    }
  }

  ngOnInit(){
    this.reloadPosts();
  }
    
}
