import { Component, inject } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-just-registered',
  imports: [],
  templateUrl: './just-registered.component.html',
  styleUrl: './just-registered.component.css'
})
export class JustRegisteredComponent {
  globals = inject(GlobalService);
}
