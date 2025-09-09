import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
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
  page:number = 1;
  lastPage:boolean = false;
  isLoading:boolean = false;

  constructor(private router: Router){
    effect(() => {
      if(this.globals.loggedIn() === false && this.router.url === '/top'){
        this.router.navigate(['/']);
      }
    })
  };



  reloadPosts(){
    this.lastPage = false;
    this.isLoading = false;
    if(this.router.url === '/top/this-week' || this.router.url === '/top' || this.router.url === '/'){
      this.requestService.fetchTopPostsThisWeek(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null, 1).subscribe({
        next: (data) => {
          this.posts = data;
          this.page = 2;
          console.log(this.posts)
        }
      })
    } else {
      this.requestService.fetchTopPostsThisMonth(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null, 1).subscribe({
        next: (data) => {
          this.posts = data;
          this.page = 2;
        }
      })
    }
  }

  loadMorePosts() {
    if(this.posts && this.posts.length % 20 == 0){
      
      if(this.router.url === '/top/this-week' || this.router.url === '/top' || this.router.url === '/'){
            this.requestService.fetchTopPostsThisWeek(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null, this.page).subscribe({
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
      } else {
            this.requestService.fetchTopPostsThisMonth(this.globals.getJwtHeader() != null ? this.globals.getJwtHeader() : null, this.page).subscribe({
              next: (data) => {
                if(data.length != 0){
                  console.log(this.posts);
                  console.log(data);
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
  }

  ngOnInit() {
    this.reloadPosts();
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
