import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
    reyeeted?: boolean
}

@Component({
  selector: 'app-following-posts-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './following-posts-view.component.html',
  styleUrl: './following-posts-view.component.css'
})
export class FollowingPostsViewComponent {
  requestService = inject(RequestService);
  posts!:Post[];
  globals = inject(GlobalService);
  page:number = 1;
  lastPage:boolean = false;
  isLoading:boolean = false;

  ngOnInit(){
    this.reloadPosts();
  }

  reloadPosts(){
    this.lastPage = false;
    this.isLoading = false;
    this.page = 2;
    this.requestService.fetchFollowingFeed(this.globals.getJwtHeader()!, 1).subscribe({
      next: (data) => this.posts = data
    })
  }

  loadMorePosts() {
    if(this.posts && this.posts.length % 20 == 0){
      this.requestService.fetchFollowingFeed(this.globals.getJwtHeader()!, this.page).subscribe({
      next: (data) => { 
        if(data.length != 0){
          this.posts = [...this.posts, ...data];
        } else {
          this.lastPage = true;
        }
          this.isLoading = false;
          this.page++;
        }
    })
    }
  }

  @ViewChild('load') sentinel!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.isLoading && !this.lastPage && this.posts) {
        this.isLoading = true;
        this.loadMorePosts();
      }
    }, { threshold: 1.0 });

    observer.observe(this.sentinel.nativeElement);
  }
  
}
