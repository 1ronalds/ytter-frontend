import { Component, effect, EventEmitter, HostBinding, inject, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activatedRoute = inject(ActivatedRoute);
  globals = inject(GlobalService);
  router = inject(Router);
  headerType:string = "";
  loggedOutTopOrNew:string = "";
  @HostBinding('style.--main-link-color') mainLinkColor = 'black';
  @HostBinding('style.--submenu-box-color') submenuBoxColor = 'yellow';

  constructor(){
    effect(() => {
      this.globals.darkMode() ? this.mainLinkColor = 'white' : this.mainLinkColor = 'black';
      this.globals.darkMode() ? this.submenuBoxColor = 'lightgreen' : this.submenuBoxColor = 'yellow';
    })

    if(!this.globals.loggedIn()){
      if(this.router.url === '/' || this.router.url === '/top/this-month' || this.router.url === '/top/all-time'){
        this.loggedOutTopOrNew = "top";
      } else {
        this.loggedOutTopOrNew = "new";
      }
    }
  }

  get isTop(): boolean {
    if(this.router.url === '/' || this.router.url === '/top/this-month' || this.router.url === '/top/all-time'){
        return true;
      } else {
        return false;
      }
  }


  ngOnInit(){
    this.activatedRoute.data.subscribe(data => {
      this.headerType = data["headerType"];
    })

  }
}