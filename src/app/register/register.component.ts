import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../request.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
            next: (res) => console.log(res),
            error: (err) => console.log(err)
          })
        }
    }
    
}
