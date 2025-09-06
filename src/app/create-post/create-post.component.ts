import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../request.service';

@Component({
  standalone: true,
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  @Output() close = new EventEmitter<void>();
  globals = inject(GlobalService);
  requestService = inject(RequestService);
  text:string = '';

  get charlen(){
    return this.text.length;
  }

  closeBoxFunc(){
    this.close.emit();
  }

  post(){
    this.requestService.post({text: this.text}, this.globals.getJwtHeader()).subscribe({
      next: (data)=> {
        console.log("Post successful");
        this.close.emit();
      },
      error: (err)=> console.log("Error", err)
    })
  }
}
