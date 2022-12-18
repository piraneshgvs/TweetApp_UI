import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';
import { TweetTable } from '../tweet-table';

@Component({
  selector: 'app-mytweet',
  templateUrl: './mytweet.component.html',
  styleUrls: ['./mytweet.component.css']
})
export class MytweetComponent {

  tweetTable!:TweetTable[];
  token !: string;
  userName !: string;
  message !: string;

  constructor(private tweetAppService : TweetAppServiceService, private router : Router){ }

  ngOnInit(): void {
    if (!sessionStorage.getItem("userId") && !sessionStorage.getItem("token")) {
      this.router.navigate(["/login"])
    }
    else {
      this.token = sessionStorage.getItem("token")!;
      this.userName = sessionStorage.getItem("userId")!;
      this.getUserTweets();
    }
  }

  getUserTweets(){

    this.tweetAppService.getAllUserTweets(this.token, this.userName).subscribe((data)=>{
        console.log(data);
        this.tweetTable = data;
    })

  }

  redirect(tweet : any){
    
    this.router.navigate(['/replytweet',JSON.stringify(tweet)]);
  }


  likePage(tweet: any) {
    this.router.navigate(['/liketweet', JSON.stringify(tweet)]);
  }

  likeUpdate(tweet: any) {
    this.tweetAppService.likeUserUpdate(this.userName, tweet.tweetId, this.token).subscribe((data) => {
      console.log(data);
      this.tweetTable = data;
      this.reloadCurrentRoute();
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });

  }

  updateTweet(tweet : TweetTable){
    let rootTweet = tweet.rootTweet;
    let tweetId = tweet.tweetId;
    this.router.navigate(['/updateTweet',rootTweet, tweetId]);
  }

  deleteTweet(tweet : TweetTable){
    let deleteId = tweet.tweetId!;
    this.tweetAppService.deleteTweet(this.token, tweet.userId, deleteId).subscribe({
      next:(data)=>{
        console.log(data)
          this.getUserTweets();
          this.message = data.message;
        }
    })
  }

}
