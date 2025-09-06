import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../src/app/header/header.component";
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../src/app/request.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../src/app/global.service';
import { CreatePostBtnComponent } from '../../src/app/create-post-btn/create-post-btn.component';

@Component({
  standalone: true,
  selector: 'app-find-users-view',
  imports: [FormsModule, CreatePostBtnComponent],
  templateUrl: './find-users-view.component.html',
  styleUrl: './find-users-view.component.css'
})
export class FindUsersViewComponent {
  username:string = "";
  requestService = inject(RequestService);
  router = inject(Router);
  globals = inject(GlobalService);
  doesExist?:boolean;

  search(){
    this.requestService.getDoesUserExist(this.username).subscribe({next: (data)=>data === 'true' ? this.navigateToRightDirection() : this.doesExist = false});
  }

  navigateToRightDirection(){
    this.username === this.globals.name() ? this.router.navigate(['/profile']) : this.router.navigate(['/user', this.username]);
  }
}
