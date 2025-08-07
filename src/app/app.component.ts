import { Component, inject, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GlobalService } from './global.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  globals = inject(GlobalService);
  darkMode:WritableSignal<boolean> = this.globals.darkMode;
}
