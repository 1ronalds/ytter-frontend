import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { GlobalService } from '../../src/app/global.service';
import { RequestService } from '../../src/app/request.service';
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { Router } from '@angular/router';

interface ProfilePublicData {
  username: string,
  name: string
}

@Component({
  selector: 'app-my-followers-view',
  imports: [HeaderComponent, CreatePostBtnComponent],
  templateUrl: './my-followers-view.component.html',
  styleUrl: './my-followers-view.component.css'
})
export class MyFollowersViewComponent {
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  followers!:ProfilePublicData[];
  router = inject(Router);

  ngOnInit(){
    this.requestService.fetchFollowersOfUser(this.globals.username()).subscribe({next:(data:ProfilePublicData[])=>{this.followers = data}})
  }

  openUser(username:string){
    this.router.navigate(['/user', username]);
  }
}
