import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-verify',
  imports: [],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  router = inject(Router);
  requests = inject(RequestService);
  globalService = inject(GlobalService);
  ngOnInit(){
    const key = this.router.url.split('/').filter(Boolean).pop();
    key && this.requests.verify(key).subscribe();
  }
}
