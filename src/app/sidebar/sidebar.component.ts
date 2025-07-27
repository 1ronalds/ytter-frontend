import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { GlobalService } from '../global.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, RouterModule, LoginComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  count:string = '0';
  @Input() makeHomeBold!:boolean;
  globals = inject(GlobalService);
  displayLogin:boolean = false;

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
