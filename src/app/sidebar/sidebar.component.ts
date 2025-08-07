import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { GlobalService } from '../global.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, RouterModule, LoginComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  globals = inject(GlobalService);
  displayLogin:boolean = false;
  router = inject(Router);
  count:number = 0;

  get isHome(): boolean {
    if(this.router.url === '/top' || this.router.url === '/reyeets' ||
       this.router.url === '/top/this-month' || this.router.url === '/top/all-time' ||
       this.router.url === '/new' || this.router.url === '/'){
        return true;
      } else {
        return false;
      }
  }

  toggleDarkMode() {
    this.globals.darkMode.update(state => !state);
  }

  logout(){
    this.globals.loggedIn.set(false);
  }
  toggleDisplayLogin(){
    this.displayLogin = !this.displayLogin;
  }
}
