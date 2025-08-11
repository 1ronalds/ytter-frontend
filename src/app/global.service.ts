import { Injectable, signal, WritableSignal } from '@angular/core';

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
  }

  setJwtHeader(jwt: string) {
    localStorage.setItem('JWTtoken', jwt);
    this.jwtHeader.set(jwt);
    this.loggedIn.set(!!jwt);
  }

  getJwtHeader() {
    return this.jwtHeader();
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
    this.username.set(username);
  }

  getUsername() {
    return this.username();
  }

  setName(name: string) {
    localStorage.setItem('name', name);
    this.name.set(name);
  }

  getName() {
    return this.name();
  }

  setDarkMode(dark: boolean) {
    localStorage.setItem('dark-mode', dark.toString());
    this.darkMode.set(dark);
  }

  getDarkMode() {
    return this.darkMode();
  }

  setLoggedIn(status: boolean) {
    this.loggedIn.set(status);
  }

  getLoggedIn() {
    return this.loggedIn();
  }
}