import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-followers',
  imports: [],
  templateUrl: './user-followers.component.html',
  styleUrl: './user-followers.component.css'
})
export class UserFollowersComponent {
  @Input() username?:string;


}
