import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { PostComponent } from '../../src/app/post/post.component';
import { RequestService } from '../../src/app/request.service';
import { GlobalService } from '../../src/app/global.service';

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
  selector: 'app-new-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './new-view.component.html',
  styleUrl: './new-view.component.css'
})
export class NewViewComponent {
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
    this.page = 2;
    this.lastPage = false;
    this.isLoading = false;
    this.requestService.fetchNewPosts(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null, 1).subscribe({
      next: (data) => this.posts = data
    })
  }
  loadMorePosts(){
    if(this.posts && this.posts.length % 20 == 0){
      this.requestService.fetchNewPosts(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null, this.page).subscribe({
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
