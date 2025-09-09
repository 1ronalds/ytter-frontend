import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { GlobalService } from '../../global.service';
import { RequestService } from '../../request.service';
import { PostComponent } from '../../post/post.component';
import { CreatePostBtnComponent } from '../../create-post-btn/create-post-btn.component';

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
  selector: 'app-user-reyeets',
  imports: [PostComponent, CreatePostBtnComponent],
  templateUrl: './user-reyeets.component.html',
  styleUrl: './user-reyeets.component.css'
})
export class UserReyeetsComponent {
  @Input() username!:string;
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  reyeets?:Post[];
  page:number = 1;
  lastPage:boolean = false;
  isLoading:boolean = false;

  ngOnInit(){
    this.page = 2;
    this.requestService.fetchReyeetsByUser(this.username, this.globals.loggedIn() ? this.globals.getJwtHeader() : null, 1).subscribe({next: (data:Post[]) => this.reyeets = data});
  }

  ngOnChanges(){
    this.page = 2;
    this.requestService.fetchReyeetsByUser(this.username, this.globals.loggedIn() ? this.globals.getJwtHeader() : null, 1).subscribe({next: (data:Post[]) => this.reyeets = data});
  }

  loadMore(){
    if(this.reyeets && this.reyeets.length % 20 == 0){
      this.requestService.fetchReyeetsByUser(this.username, this.globals.loggedIn() ? this.globals.getJwtHeader() : null, this.page).subscribe({next: (data:Post[]) => {
        if(this.reyeets && data.length != 0){
          this.reyeets = [...this.reyeets, ...data];
        } else {
          this.lastPage = true;
        }
          this.isLoading = false;
          this.page++;
       }
      });
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
