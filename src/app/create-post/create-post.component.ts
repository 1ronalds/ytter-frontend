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
  image:File|null = null;

  get charlen(){
    return this.text.length;
  }

  closeBoxFunc(){
    this.close.emit();
  }

  post(){
    this.requestService.post({text: this.text}, this.image != null ? this.image : null, this.globals.getJwtHeader()!).subscribe({
      next: (data)=> {
        this.close.emit();
      },
      error: (err)=> console.log("Error", err)
    })
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file){
      this.image = file;
    }
  }

  removeImage(){
    this.image = null;
  }

  shorten(text: string) {
    if (!text) return '';
    return text.length > 7 ? text.slice(0, 7) + '...' : text;
  }

}
