import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() name:string = "";
  @Input() username:string = "";
  @Input() text:string = "";
  @Input() likes:number = 0;
  @Input() reyeets:number = 0;
  @Input() replies:number = 0;
  @Input() time:string = "";
  openMenu:boolean = false;
  report:boolean = false;

  toggleReport(){
    this.report = !this.report;
  }
  
  toggleMenu(){
    this.openMenu = !this.openMenu;
  }

  reportpost(){
    this.report = !this.report;
  }
}
