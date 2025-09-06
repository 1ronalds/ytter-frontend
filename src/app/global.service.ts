import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  username: WritableSignal<string>;
  name: WritableSignal<string>;
  jwtHeader: WritableSignal<string>;
  darkMode: WritableSignal<boolean>;
  loggedIn: WritableSignal<boolean>;

  constructor() {
    this.username = signal(localStorage.getItem('username') || '');
    this.name = signal(localStorage.getItem('name') || '');
    this.jwtHeader = signal(localStorage.getItem('JWTtoken') || '');
    this.darkMode = signal(localStorage.getItem('dark-mode') === 'true');
    this.loggedIn = this.jwtHeader() === '' ? signal(false) : signal(true);

    effect(() => {
      if(this.loggedIn() === false){
        this.jwtHeader.set('');
      }
    })

    effect(() => {
      localStorage.setItem('username', this.username());
    });

    effect(() => {
      localStorage.setItem('name', this.name());
    });

    effect(() => {
      localStorage.setItem('JWTtoken', this.jwtHeader());
    });

    effect(() => {
      localStorage.setItem('dark-mode', this.darkMode().toString());
    });
  }

  getJwtHeader() {
    return this.jwtHeader();
  }

}