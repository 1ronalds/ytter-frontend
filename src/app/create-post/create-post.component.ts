import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormsModule } from '@angular/forms';

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
  text:string = '';

  get charlen(){
    return this.text.length;
  }

  closeBoxFunc(){
    this.close.emit();
  }

}
