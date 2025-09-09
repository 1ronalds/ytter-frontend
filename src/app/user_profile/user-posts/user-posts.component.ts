import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { RequestService } from '../../request.service';
import { PostComponent } from '../../post/post.component';
import { GlobalService } from '../../global.service';

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
  selector: 'app-user-posts',
  imports: [PostComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent {
  @Input() username!:string;
  requestService = inject(RequestService);
  globals = inject(GlobalService);
  posts?: Post[];
  page:number = 1;
  lastPage:boolean = false;
  isLoading:boolean = false;

  ngOnInit(){
    this.loadPosts();
  }

  ngOnChanges(){
    this.loadPosts();
  }
  
  loadPosts(){
    this.page = 2;
    this.requestService.fetchPostsByUser(this.username,this.globals.loggedIn() ? this.globals.getJwtHeader() : null, 1).subscribe({next:(data:Post[])=>{this.posts=data}})
  }
  
  loadMorePosts() {
    if(this.posts && this.posts.length % 20 == 0){
      this.requestService.fetchPostsByUser(this.username,this.globals.loggedIn() ? this.globals.getJwtHeader() : null, this.page).subscribe({next:(data:Post[])=>{
        if(this.posts && data.length != 0){
          this.posts = [...this.posts, ...data];
        } else {
          this.lastPage = true;
        }
          this.isLoading = false;
        this.page++;
      }})
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
