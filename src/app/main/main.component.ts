import { ChangeDetectorRef, Component, inject, WritableSignal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { GlobalService } from '../global.service';
import { ActivatedRoute } from '@angular/router';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostComponent } from '../post/post.component';
import { PostserviceService } from '../postservice.service';


@Component({
  selector: 'app-main',
  imports: [HeaderComponent, SidebarComponent, CreatePostComponent, PostComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  makeHomeBold:boolean = false;
  cdr:ChangeDetectorRef = inject(ChangeDetectorRef);
  globals = inject(GlobalService);
  postservice = inject(PostserviceService);
  darkMode:WritableSignal<boolean> = this.globals.darkMode;
  activatedRoute = inject(ActivatedRoute);
  viewType:string = "";
  createPostBox:boolean = false;
  posts:any = [];

  makeHomeBoldHandler(makeHomeBold:boolean){
    this.makeHomeBold = makeHomeBold;
  }

  ngAfterViewInit(){
    this.cdr.detectChanges();
  }

  ngOnInit(){
    this.activatedRoute.data.subscribe(data => {
      this.viewType = data["viewType"];
      
    })
    this.posts = this.postservice.getPosts();
    }

  toggleCreatePostBox(){
    this.createPostBox = !this.createPostBox;
  }
}
