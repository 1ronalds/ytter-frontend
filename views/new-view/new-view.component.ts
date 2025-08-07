import { Component } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';

@Component({
  selector: 'app-new-view',
  imports: [HeaderComponent, CreatePostBtnComponent],
  templateUrl: './new-view.component.html',
  styleUrl: './new-view.component.css'
})
export class NewViewComponent {

}
