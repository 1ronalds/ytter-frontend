import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  constructor() { }
  getPosts(){
    return [
      {id:0, name: 'Ronalds', username: 'ronalds1', text: 'nfewfwifewifjwifjw', likes: 1, reyeets: 2, replies: 3, time: '1d'},
      {id:1, name: 'Ronalds', username: 'ronalds1', text: 'nfewfwifewifjwifjw', likes: 1, reyeets: 2, replies: 3, time: '1d'}
    ]
  }
}