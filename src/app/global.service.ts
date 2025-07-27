import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public username:string = 'ronalds1';
  public name:string = 'ronalds'
  public darkMode:WritableSignal<boolean> = signal<boolean>(false);
  public loggedIn:WritableSignal<boolean> = signal<boolean>(false);
  constructor() { }
}
