import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router);
  requestService = inject(RequestService);
  data = {
    username: '',
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  }

  register(form: any){
    if(this.data.password == this.data.passwordRepeat){
      this.requestService.register(form.value).subscribe({
          next: (res) => this.moveToSuccessPage(),
          error: (err) => console.log(err)
      })
    }
  }

  moveToSuccessPage(){
    this.router.navigate(['/registered']);
  }
}
