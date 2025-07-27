import { Component, effect, EventEmitter, HostBinding, inject, Output } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private activatedRoute = inject(ActivatedRoute);
  private globals = inject(GlobalService);

  viewType:string = "";
  fullViewType:string = "";
  @Output() makeHomeBold: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @HostBinding('style.--main-link-color') mainLinkColor = 'black';
  @HostBinding('style.--submenu-box-color') submenuBoxColor = 'yellow';

  constructor(){
    effect(() => {
      this.globals.darkMode() ? this.mainLinkColor = 'white' : this.mainLinkColor = 'black';
      this.globals.darkMode() ? this.submenuBoxColor = 'lightgreen' : this.submenuBoxColor = 'yellow';
      if(this.globals.loggedIn()){
        this.ngOnInit();
      }
    })
  }

  ngOnInit(){
    this.activatedRoute.data.subscribe(data => {
      this.viewType = data["viewType"]
    })

    switch(this.viewType){
      case 'default':
        if(this.globals.loggedIn()){
          this.fullViewType = 'normal';
          this.makeHomeBold.emit(true);
        } else {
          this.fullViewType = 'top-logout';
          this.makeHomeBold.emit(true);
        }
        break;
      case 'profile':
        if(this.globals.loggedIn()){
          this.fullViewType = 'profile';
          this.makeHomeBold.emit(false);
        }
        break;
      case 'top':
        this.fullViewType = 'top';
        this.makeHomeBold.emit(true);
        break;
      }
  }


}