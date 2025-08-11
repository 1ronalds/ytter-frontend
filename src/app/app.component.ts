import { Component, inject, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GlobalService } from './global.service';
import { LoginComponent } from "./login/login.component";


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  globals = inject(GlobalService);
  darkMode:WritableSignal<boolean> = this.globals.darkMode;
  openLogin:boolean = false;
}
