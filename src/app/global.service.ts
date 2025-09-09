import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface jwtData {
  sub:string,
  admin:string,
  exp:number
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  username: WritableSignal<string>;
  name: WritableSignal<string>;
  jwtHeader: WritableSignal<string>;
  darkMode: WritableSignal<boolean>;
  loggedIn: WritableSignal<boolean>;
  admin: WritableSignal<boolean>;

  constructor() {
    this.username = signal(localStorage.getItem('username') || '');
    this.name = signal(localStorage.getItem('name') || '');
    this.jwtHeader = signal(localStorage.getItem('JWTtoken') || '');
    this.darkMode = signal(localStorage.getItem('dark-mode') === 'true');
    this.loggedIn = this.jwtHeader() === '' ? signal(false) : signal(true);
    this.admin = signal(localStorage.getItem('admin') === 'true');


    effect(() => {
      if(this.loggedIn() === false){
        this.jwtHeader.set('');
      }
    })

    effect(()=> {
      localStorage.setItem('admin', this.admin().toString())
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
    if(this.jwtHeader()){
      const jwt = jwtDecode<jwtData>(this.jwtHeader().substring(7));
      if(Math.floor(Date.now() / 1000) > jwt.exp){
        this.loggedIn.set(false);
      }
      return this.jwtHeader();
    } else {
      return null;
    }
  }
}