import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GlobalService } from '../global.service';
import { RequestService } from '../request.service';
import { HttpResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface jwtData {
  sub:string,
  admin:string,
  exp:number
}

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
  requestService = inject(RequestService);
  error:boolean = false;

  closeBoxFunc(){
    this.close.emit();
  }

  processLogin(form: NgForm){
    this.requestService.login(form.value).subscribe({next: (response: HttpResponse<any>) => {
      if(response.ok){
        let authorizationHeader = response.headers.get("Authorization");
        if(authorizationHeader != null){
          this.globals.jwtHeader.set(authorizationHeader);
          this.globals.username.set(form.value.username);
          this.requestService.getName(this.globals.getJwtHeader()!).subscribe({next: (data) => {this.globals.name.set(data)}});
          this.close.emit();
          this.globals.loggedIn.set(true);
          const decoded = jwtDecode<jwtData>(authorizationHeader.substring(7));
          this.globals.admin.set(decoded.admin === 'yes');
        }

      }
    },
    error: (data) => this.error = true
    });
  }
}