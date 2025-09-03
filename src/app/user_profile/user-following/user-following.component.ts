import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-following',
  imports: [],
  templateUrl: './user-following.component.html',
  styleUrl: './user-following.component.css'
})
export class UserFollowingComponent {
  @Input() username?:string;
}
