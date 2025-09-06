import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getAllNotifications(jwt:string){
    return this.http.get<Notification[]>('http://localhost:3000/api/notifications/all', {headers:{Authorization:jwt}});
  }

  getUnreadNotifications(jwt:string){
    return this.http.get<Notification[]>('http://localhost:3000/api/notifications/unread', {headers:{Authorization:jwt}});
  }

  getNotificationCount(jwt:string){
    return this.http.get('http://localhost:3000/api/notifications/unread-count', {responseType: 'text', headers:{Authorization:jwt}});
  }

  deleteComment(commentId:string, jwt:string){
    return this.http.delete('http://localhost:3000/api/comment/delete/'+commentId, {headers:{Authorization: jwt}});
  }

  deletePost(postId:string, jwt:string){
    return this.http.delete('http://localhost:3000/api/posts/'+postId, {headers:{Authorization: jwt}});
  }

  fetchReyeetFeed(jwt:string){
    return this.http.get<Post[]>('http://localhost:3000/api/reyeet-feed?limit=100&offset=0', {headers: {Authorization: jwt}});
  }

  follow(username:string, jwt:string){
    return this.http.post('http://localhost:3000/api/profile/'+username+'/follow', null, {headers: {Authorization: jwt}});
  }

  unfollow(username:string, jwt:string){
    return this.http.delete('http://localhost:3000/api/profile/'+username+'/follow', {headers: {Authorization: jwt}});
  }

  getIsFollowing(username:string, jwt:string){
    return this.http.get('http://localhost:3000/api/profile/'+username+"/amifollowing", {responseType: 'text', headers: { Authorization: jwt}});
  }

  getName(jwt:string){
    return this.http.get('http://localhost:3000/api/whatismyname', {responseType: 'text', headers: { Authorization: jwt}});
  }

  getDoesUserExist(username:string){
    return this.http.get('http://localhost:3000/api/doesuserexist/'+username, {responseType: 'text'});
  }

  fetchPostsByUser(username:string, jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>('http://localhost:3000/api/posts/profile/'+username+'?limit=100&offset=0', options);
  }

  fetchReyeetsByUser(username:string, jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>('http://localhost:3000/api/reyeets/'+username+'?limit=100&offset=0', options);
  }

  fetchFollowersOfUser(username:string){
    return this.http.get<ProfilePublicData[]>('http://localhost:3000/api/profile/'+username+'/followers');
  }

  fetchFollowingOfUser(username:string){
    return this.http.get<ProfilePublicData[]>('http://localhost:3000/api/profile/'+username+'/following');
  }

  fetchTopPostsThisWeek(jwt: string | null) {
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>("http://localhost:3000/api/posts/top/this-week?limit=100&offset=0", options);
  }

  fetchTopPostsThisMonth(jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>("http://localhost:3000/api/posts/top/this-month?limit=100&offset=0", options);
  }

  fetchNewPosts(jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Post[]>("http://localhost:3000/api/posts/new?limit=100&offset=0", options);
  }

  fetchFollowingFeed(jwt:string){
    return this.http.get<Post[]>('http://localhost:3000/api/posts/following-feed?limit=100&offset=0', {headers: { Authorization: jwt}});
  }

  fetchMyPosts(jwt:string){
    return this.http.get<Post[]>('http://localhost:3000/api/posts/by-me?limit=100&offset=0', {headers: { Authorization: jwt}});
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

  likePost(id:string, jwt:string){
    return this.http.post('http://localhost:3000/api/post/'+id+'/like', null, {headers: {Authorization: jwt}});
  }

  unlikePost(id:string, jwt:string){
    return this.http.delete('http://localhost:3000/api/post/'+id+'/like', {headers:{Authorization: jwt}})
  }

  likeComment(id:string, jwt:string){
    return this.http.post('http://localhost:3000/api/comment/'+id+'/like', null, {headers: {Authorization: jwt}});
  }

  unlikeComment(id:string, jwt:string){
    return this.http.delete('http://localhost:3000/api/comment/'+id+'/like', {headers:{Authorization: jwt}})
  }

  reyeetPost(id:string, jwt:string){
    return this.http.post('http://localhost:3000/api/posts/'+id+'/ry', null, {headers: {Authorization: jwt}});
  }

  unReyeetPost(id:string, jwt:string){
    return this.http.delete('http://localhost:3000/api/posts/'+id+'/ry', {headers:{Authorization: jwt}});
  }

  postCommentToPost(data: NewComment, jwt:string){
    return this.http.post('http://localhost:3000/api/comment/to-post/create', data, {headers:{Authorization:jwt}});
  }

  postCommentToComment(data:NewComment, jwt:string){
    return this.http.post('http://localhost:3000/api/comment/to-comment/create', data, {headers:{Authorization:jwt}});
  }

  getCommentsToPost(postId:string, jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Comment[]>('http://localhost:3000/api/comment/to-post/'+postId, options);
  }

  getCommentsToComment(commentId:string, jwt:string|null){
    let options = {};
    if(jwt){
      options = { headers: new HttpHeaders({ Authorization: jwt })};
    }
    return this.http.get<Comment[]>('http://localhost:3000/api/comment/to-comment/'+commentId, options);
  }
}