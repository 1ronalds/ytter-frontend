import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {env} from './environment'

interface Report {
  text:string,
  postId:string,
  commentId:string
}

interface Notification {
  description:string,
  link:string,
  read:boolean,
  timestamp:string
}

interface ProfilePublicData {
  username: string,
  name: string
}

interface Post {
    postId: string,
    profilePublicData: ProfilePublicData,
    imageId?: number,
    replyCount?: number,
    likeCount?: number,
    reyeetCount?: number,
    text: string,
    timestamp: string,
    liked?: boolean,
    reyeeted?: boolean,
    reyeetedByName?: string
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

interface NewComment {
  rootPostId:string,
  replyToCommentId:string|null,
  comment:string
}

interface Comment {
  commentId: string,
  profilePublicData: ProfilePublicData;
  rootPostId: string;
  replyToCommentId: string;
  comment: string,
  likeCount: number,
  liked: boolean,
  replyCount: number,
  timestamp: string
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

  URL = env.server;

  verify(key:string){
    return this.http.get(`${this.URL}/api/verify/${key}`);
  }

  ignorePostReport(postId:string, jwt:string){
    return this.http.delete(`${this.URL}/api/report/post/${postId}`, {headers:{Authorization:jwt}});
  }

  ignoreCommentReport(commentId:string, jwt:string){
    return this.http.delete(`${this.URL}/api/report/comment/${commentId}`, {headers:{Authorization:jwt}});
  }

  reportPost(postId:string, jwt:string){
    return this.http.post(`${this.URL}/api/report/post/${postId}`, null, {headers: {Authorization:jwt}});
  }

  reportComment(commentId:string, jwt:string){
    return this.http.post(`${this.URL}/api/report/comment/${commentId}`, null, {headers: {Authorization:jwt}});
  }

  getReports(jwt:string){
    return this.http.get<Report[]>(`${this.URL}/api/report`, {headers:{Authorization:jwt}});
  }

  getAllNotifications(jwt:string){
    return this.http.get<Notification[]>(`${this.URL}/api/notifications/all`, {headers:{Authorization:jwt}});
  }

  getUnreadNotifications(jwt:string){
    return this.http.get<Notification[]>(`${this.URL}/api/notifications/unread`, {headers:{Authorization:jwt}});
  }

  getNotificationCount(jwt:string){
    return this.http.get(`${this.URL}/api/notifications/unread-count`, {responseType: 'text', headers:{Authorization:jwt}});
  }

  deleteComment(commentId:string, jwt:string){
    return this.http.delete(`${this.URL}/api/comment/delete/${commentId}`, {headers:{Authorization: jwt}});
  }

  deletePost(postId:string, jwt:string){
    return this.http.delete(`${this.URL}/api/posts/${postId}`, {headers:{Authorization: jwt}});
  }

  fetchReyeetFeed(jwt:string, page:number){
    let limit = 20;
    let offset = page-1;
    return this.http.get<Post[]>(`${this.URL}/api/reyeet-feed?limit=${limit}&offset=${offset}`, {headers: {Authorization: jwt}});
  }

  follow(username:string, jwt:string){
    return this.http.post(`${this.URL}/api/profile/${username}/follow`, null, {headers: {Authorization: jwt}});
  }

  unfollow(username:string, jwt:string){
    return this.http.delete(`${this.URL}/api/profile/${username}/follow`, {headers: {Authorization: jwt}});
  }

  getIsFollowing(username:string, jwt:string){
    return this.http.get(`${this.URL}/api/profile/${username}/amifollowing`, {responseType: 'text', headers: { Authorization: jwt}});
  }

  getName(jwt:string){
    return this.http.get(`${this.URL}/api/whatismyname`, {responseType: 'text', headers: { Authorization: jwt}});
  }

  getDoesUserExist(username:string){
    return this.http.get(`${this.URL}/api/doesuserexist/${username}`, {responseType: 'text'});
  }

  fetchPostsByUser(username:string, jwt:string|null, page:number){
    let limit = 20;
    let offset = page-1;
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>(`${this.URL}/api/posts/profile/${username}?limit=${limit}&offset=${offset}`, options);
  }

  fetchReyeetsByUser(username:string, jwt:string|null, page:number){
    let limit = 20;
    let offset = page-1;
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>(`${this.URL}/api/reyeets/${username}?limit=${limit}&offset=${offset}`, options);
  }

  fetchFollowersOfUser(username:string){
    return this.http.get<ProfilePublicData[]>(`${this.URL}/api/profile/${username}/followers`);
  }

  fetchFollowingOfUser(username:string){
    return this.http.get<ProfilePublicData[]>(`${this.URL}/api/profile/${username}/following`);
  }

  fetchTopPostsThisWeek(jwt: string | null, page:number) {
    let limit = 20;
    let offset = page-1;
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>(`${this.URL}/api/posts/top/this-week?limit=${limit}&offset=${offset}`, options);
  }

  fetchTopPostsThisMonth(jwt:string|null, page:number){
    let limit = 20;
    let offset = page-1;
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>(`${this.URL}/api/posts/top/this-month?limit=${limit}&offset=${offset}`, options);
  }

  fetchNewPosts(jwt:string|null, page:number){
    let limit = 20;
    let offset = page-1;
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>(`${this.URL}/api/posts/new?limit=${limit}&offset=${offset}`, options);
  }

  fetchFollowingFeed(jwt:string, page:number){
    let limit = 20;
    let offset = page-1;
    return this.http.get<Post[]>(`${this.URL}/api/posts/following-feed?limit=${limit}&offset=${offset}`, {headers: { Authorization: jwt}});
  }

  fetchMyPosts(jwt:string, page:number){
    let limit = 20;
    let offset = page-1;
    return this.http.get<Post[]>(`${this.URL}/api/posts/by-me?limit=${limit}&offset=${offset}`, {headers: { Authorization: jwt}});
  }

  register(data: Register){
    return this.http.post<Register>(`${this.URL}/api/register`, data, {
      headers: { 'Content-Type': 'application/json' }});
  }

  login(data: Login){
    return this.http.post<Register>(`${this.URL}/api/login`, data, {
      headers: { 'Content-Type': 'application/json' }, observe: 'response'});
  }

  post(data: NewPost, image:File|null, jwt:string,){
    let formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if(image){
      formData.append('file', image, image.name);
    }
    return this.http.post(`${this.URL}/api/posts/upload`, formData, {headers: { Authorization: jwt}});
  }

  likePost(id:string, jwt:string){
    return this.http.post(`${this.URL}/api/post/${id}/like`, null, {headers: {Authorization: jwt}});
  }

  unlikePost(id:string, jwt:string){
    return this.http.delete(`${this.URL}/api/post/${id}/like`, {headers:{Authorization: jwt}})
  }

  likeComment(id:string, jwt:string){
    return this.http.post(`${this.URL}/api/comment/${id}/like`, null, {headers: {Authorization: jwt}});
  }

  unlikeComment(id:string, jwt:string){
    return this.http.delete(`${this.URL}/api/comment/${id}/like`, {headers:{Authorization: jwt}})
  }

  reyeetPost(id:string, jwt:string){
    return this.http.post(`${this.URL}/api/posts/${id}/ry`, null, {headers: {Authorization: jwt}});
  }

  unReyeetPost(id:string, jwt:string){
    return this.http.delete(`${this.URL}/api/posts/${id}/ry`, {headers:{Authorization: jwt}});
  }

  postCommentToPost(data: NewComment, jwt:string){
    return this.http.post(`${this.URL}/api/comment/to-post/create`, data, {headers:{Authorization:jwt}});
  }

  postCommentToComment(data:NewComment, jwt:string){
    return this.http.post(`${this.URL}/api/comment/to-comment/create`, data, {headers:{Authorization:jwt}});
  }

  getCommentsToPost(postId:string, jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Comment[]>(`${this.URL}/api/comment/to-post/${postId}`, options);
  }

  getCommentsToComment(commentId:string, jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Comment[]>(`${this.URL}/api/comment/to-comment/${commentId}`, options);
  }
}