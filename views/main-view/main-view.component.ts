import { Component, inject } from '@angular/core';
import { GlobalService } from '../../src/app/global.service';
import { TopViewComponent } from "../top-view/top-view.component";
import { FollowingPostsViewComponent } from '../following-posts-view/following-posts-view.component';

@Component({
  selector: 'app-main-view',
  imports: [TopViewComponent, FollowingPostsViewComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  globals = inject(GlobalService);
}
