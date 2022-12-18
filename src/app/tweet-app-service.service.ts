import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPassword } from './forgot-password';
import { JwtRequest } from './jwt-request';
import { ReplyTweetTable } from './reply-tweet-table';
import { TweetTable } from './tweet-table';
import { UserDetails } from './user-details';

@Injectable({
  providedIn: 'root'
})
export class TweetAppServiceService {

  constructor(private http:HttpClient) { }

  getAllTweets(token:string, userName:string):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    headers.set('Content-Type', 'application/json');
    console.log(headers);
    const params = new HttpParams()
    .set('username',userName);
    return this.http.get("http://localhost:8081/api/v1.0/tweets/getAllTweet/",{params, headers:headers});
  }

  getAllUserTweets(token : string, userName:string):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    headers.set('Content-Type', 'application/json');
    return this.http.get("http://localhost:8081/api/v1.0/tweets/"+userName+"/getUserTweet",{headers:headers});
  }

  postNewTweet(token: string, tweet:TweetTable):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    headers.set('Content-Type', 'application/json');
    return this.http.post("http://localhost:8081/api/v1.0/tweets/addTweet",tweet,{headers:headers});
  }

  getReplyTweets(token : string, id : any):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    headers.set('Content-Type', 'application/json');
    return this.http.get("http://localhost:8081/api/v1.0/tweets/getReplyTweet/"+id,{headers:headers});
  }

  postReplyTweet(token:string, replyTweet : ReplyTweetTable):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    headers.set('Content-Type', 'application/json');
    return this.http.post("http://localhost:8081/api/v1.0/tweets/replyTweet",replyTweet,{headers:headers});
  }

  autheticateUser(jwtRequest : JwtRequest):Observable<any>{

    return this.http.post("http://localhost:8081/api/v1.0/tweets/authenticate",jwtRequest);

  }

  likeUserUpdate(userId : string,tweetId : string, token : string):Observable<any>{
    var headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    headers.set('Content-Type', 'application/json');
    return this.http.patch("http://localhost:8081/api/v1.0/tweets/"+userId+"/like/"+tweetId,"",{headers:headers});
  }

  postTheRegisteredDetails(userDetails : UserDetails):Observable<any>{
    return this.http.post("http://localhost:8081/api/v1.0/tweets/registers",userDetails);
  }

  forgotPassword(forgotPassword : ForgotPassword):Observable<any>{
    return this.http.post("http://localhost:8081/api/v1.0/tweets/forgotPassword", forgotPassword);
  }

  resetPasswordRequest(token : string, userId : string, newPassword : string):Observable<any>{
    var headers = new HttpHeaders().append("Authorization", "Bearer " + token);
    headers.append('Content-Type', 'application/json');
    return this.http.patch("http://localhost:8081/api/v1.0/tweets/resetPassword/"+userId,newPassword,{headers:headers});
  }
  updateTweet(token: string, tweet : TweetTable):Observable<any>{
    var headers = new HttpHeaders().append("Authorization", "Bearer " + token);
    headers.append('Content-Type', 'application/json');
    return this.http.patch("http://localhost:8081/api/v1.0/tweets/updateTweet/",tweet,{headers:headers});
  }

  deleteTweet(token : string, userId : string, tweetId : number):Observable<any>{
    var headers = new HttpHeaders().append("Authorization", "Bearer " + token);
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams()
    .set('tweetId',tweetId)
    .set('userId',userId);
    return this.http.delete("http://localhost:8081/api/v1.0/tweets/deleteTweet/",{params,headers:headers});
  }

  searchUsers(token : string, userId : string, search : string):Observable<any>{
    var headers = new HttpHeaders().append("Authorization", "Bearer " + token);
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams()
    .set('userId',userId);
    return this.http.get("http://localhost:8081/api/v1.0/tweets/search/userId/"+search,{params,headers:headers});
  }

}
