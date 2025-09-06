import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { GlobalService } from '../../src/app/global.service';
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { Router } from '@angular/router';
import { RequestService } from '../../src/app/request.service';

interface ProfilePublicData {
  username: string,
  name: string
}


@Component({
  selector: 'app-my-following-view',
  imports: [HeaderComponent, CreatePostBtnComponent],
  templateUrl: './my-following-view.component.html',
  styleUrl: './my-following-view.component.css'
})
export class MyFollowingViewComponent {
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  following!:ProfilePublicData[];
  router = inject(Router);

  ngOnInit(){
    this.requestService.fetchFollowingOfUser(this.globals.username()).subscribe({next:(data:ProfilePublicData[])=>{this.following = data}})
  }

  openUser(username:string){
    this.router.navigate(['/user', username]);
  }
}

