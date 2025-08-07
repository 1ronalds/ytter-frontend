import { Injectable } from '@angular/core';

interface Post {
  id: number;
  name: string;
  username: string;
  text: string;
  likes: number;
  liked: boolean;
  replies: number;
  time: string;
  reyeets?: number;
}


@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  posts = [{id:0, name: 'Ronalds', username: 'ronalds1', text: 'nfewfwifewifjwifjw', likes: 1, liked: false, reyeets: 2, reyeeted: false, replies: 2, time: '1d'},
           {id:1, name: 'Ronalds', username: 'ronalds1', text: 'nfewfwifewifjwifjw', likes: 1, liked: false, reyeets: 2, reyeeted: false, replies: 0, time: '1d'}
          ]

  commentsToPost: {[postId:number]: Post[]} = {0: [
      {id:3, name: 'Ronalds', username: 'ronalds1', text: 'Reply #1 to post', likes: 1, liked: false, replies: 2, time: '1d'},
      {id:4, name: 'Ronalds', username: 'ronalds1', text: 'Reply #2 to post', likes: 1, liked: false, replies: 1, time: '1d'},
  ]}

  commentsToComment: {[commentId:number]: Post[]} = {
    3: [
         {id:6, name: 'Ronalds', username: 'ronalds1', text: 'A', likes: 1, liked: false, reyeets: 2, replies: 0, time: '1d'},
         {id:7, name: 'Ronalds', username: 'ronalds1', text: 'B', likes: 1, liked: false, reyeets: 2, replies: 0, time: '1d'}
       ],
    4: [
        {id:8, name: 'Ronalds', username: 'ronalds1', text: 'C', likes: 1, liked: false, reyeets: 2, replies: 0, time: '1d'}
       ]
  }

  constructor() { }
  getPosts(){
    return this.posts;
  }

  getCommentsToPost(postId:number){
    return this.commentsToPost[postId];
  }

  getCommentsToComment(commentId:number){
    return this.commentsToComment[commentId];
  }

}