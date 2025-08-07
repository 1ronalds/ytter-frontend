import { Component } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';

@Component({
  selector: 'app-my-reyeets-view',
  imports: [HeaderComponent, CreatePostBtnComponent],
  templateUrl: './my-reyeets-view.component.html',
  styleUrl: './my-reyeets-view.component.css'
})
export class MyReyeetsViewComponent {

}
