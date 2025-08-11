import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PostB {
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

interface ProfileDataPublic {
  username: string,
  name: string
}

interface Post {
  postId: number,
    profileDataPublic: ProfileDataPublic,
    imageId?: number,
    replyCount?: number,
    likeCount?: number,
    reyeetCount?: number,
    text: string,
    timestamp: string,
    liked?: boolean,
    reyeeted?: boolean
}

interface Register {
  username: string,
  name: string,
  email: string,
  password: string
}

interface Login {
  username: string,
  password: string
}

interface NewPost {
  text: string
}


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  posts = [{id:0, name: 'Ronalds', username: 'ronalds1', text: 'nfewfwifewifjwifjw', likes: 1, liked: false, reyeets: 2, reyeeted: false, replies: 2, time: '1d'},
           {id:1, name: 'Ronalds', username: 'ronalds1', text: 'nfewfwifewifjwifjw', likes: 1, liked: false, reyeets: 2, reyeeted: false, replies: 0, time: '1d'}
          ]

  commentsToPost: {[postId:number]: PostB[]} = {0: [
      {id:3, name: 'Ronalds', username: 'ronalds1', text: 'Reply #1 to post', likes: 1, liked: false, replies: 2, time: '1d'},
      {id:4, name: 'Ronalds', username: 'ronalds1', text: 'Reply #2 to post', likes: 1, liked: false, replies: 1, time: '1d'},
  ]}

  commentsToComment: {[commentId:number]: PostB[]} = {
    3: [
         {id:6, name: 'Ronalds', username: 'ronalds1', text: 'A', likes: 1, liked: false, reyeets: 2, replies: 0, time: '1d'},
         {id:7, name: 'Ronalds', username: 'ronalds1', text: 'B', likes: 1, liked: false, reyeets: 2, replies: 0, time: '1d'}
       ],
    4: [
        {id:8, name: 'Ronalds', username: 'ronalds1', text: 'C', likes: 1, liked: false, reyeets: 2, replies: 0, time: '1d'}
       ]
  }

  constructor(private http: HttpClient) { }

  fetchTopPostsThisWeek(){
    return this.http.get<Post[]>("http://localhost:3000/api/posts/top/this-week?limit=100&offset=0");
  }

  register(data: Register){
    return this.http.post<Register>("http://localhost:3000/api/register", data, {
      headers: { 'Content-Type': 'application/json' }});
  }

  login(data: Login){
    return this.http.post<Register>("http://localhost:3000/api/login", data, {
      headers: { 'Content-Type': 'application/json' }, observe: 'response'});
  }

  post(data: NewPost, jwt:string){
    let formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    return this.http.post('http://localhost:3000/api/posts/upload', formData, {headers: { Authorization: jwt}});
  }



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