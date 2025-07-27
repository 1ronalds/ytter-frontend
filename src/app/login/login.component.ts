import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GlobalService } from '../global.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() close = new EventEmitter<void>();
  globals = inject(GlobalService);

  closeBoxFunc(){
    this.close.emit();
  }

  processLogin(form: NgForm){
    this.close.emit();
    this.globals.loggedIn.set(true);
  }
}
