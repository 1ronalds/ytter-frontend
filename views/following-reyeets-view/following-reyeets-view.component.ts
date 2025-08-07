import { Component } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';

@Component({
  selector: 'app-following-reyeets-view',
  imports: [HeaderComponent, CreatePostBtnComponent],
  templateUrl: './following-reyeets-view.component.html',
  styleUrl: './following-reyeets-view.component.css'
})
export class FollowingReyeetsViewComponent {

}
