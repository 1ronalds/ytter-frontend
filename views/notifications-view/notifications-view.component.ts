import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../src/app/request.service';
import { GlobalService } from '../../src/app/global.service';
import { TimePipe } from '../../src/app/time.pipe';

interface Notification {
  description:string,
  link:string,
  read:boolean,
  timestamp:string
}

@Component({
  selector: 'app-notifications-view',
  imports: [HeaderComponent, CreatePostBtnComponent, TimePipe],
  templateUrl: './notifications-view.component.html',
  styleUrl: './notifications-view.component.css'
})
export class NotificationsViewComponent {
  activatedRoute = inject(ActivatedRoute);
  requestService = inject(RequestService);
  globals = inject(GlobalService);
  notifications!:Notification[];


  ngOnInit(){
      this.activatedRoute.data.subscribe(data => {
      let view = data["tab"];
      if(view === "unread"){
        this.requestService.getUnreadNotifications(this.globals.getJwtHeader()!).subscribe({next:(data:Notification[]) => {
          this.notifications = data;
        }});
        } else if(view === "all"){
        this.requestService.getAllNotifications(this.globals.getJwtHeader()!).subscribe({next:(data:Notification[]) => {
          this.notifications = data;
        }});
      }
    });
  }
}
