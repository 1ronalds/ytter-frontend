import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { GlobalService } from '../../src/app/global.service';
import { RequestService } from '../../src/app/request.service';
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
  selector: 'app-following-reyeets-view',
  imports: [HeaderComponent, CreatePostBtnComponent, PostComponent],
  templateUrl: './following-reyeets-view.component.html',
  styleUrl: './following-reyeets-view.component.css'
})
export class FollowingReyeetsViewComponent {
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  reyeets?:Post[];
  page:number = 1;
  lastPage:boolean = false;
  isLoading:boolean = false;

  ngOnInit(){
    this.refresh();
  }

  refresh(){
    this.lastPage = false;
    this.isLoading = false;
    this.page = 2;
    this.requestService.fetchReyeetFeed(this.globals.getJwtHeader()!, 1).subscribe({next: (data:Post[]) => this.reyeets = data});
  }

  loadMore() {
    if(this.reyeets && this.reyeets.length % 20 == 0){
      this.requestService.fetchReyeetFeed(this.globals.getJwtHeader()!, this.page).subscribe({next: (data:Post[]) => {
        if(data.length != 0){
          this.reyeets = [...this.reyeets!, ...data];
        } else {
          this.lastPage = true;
        }
          this.isLoading = false;
          this.page++;      
      }});
    }
  }

  @ViewChild('load') sentinel!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.isLoading && !this.lastPage && this.reyeets) {
        this.isLoading = true;
        this.loadMore();
      }
    }, { threshold: 1.0 });

    observer.observe(this.sentinel.nativeElement);
  }
}
