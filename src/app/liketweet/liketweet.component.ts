import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';

@Component({
  selector: 'app-liketweet',
  templateUrl: './liketweet.component.html',
  styleUrls: ['./liketweet.component.css']
})
export class LiketweetComponent {

  routerParam !: any;
  likedUser !: string[];
  token !: string;
  userName !: string;

  constructor(private activatedRoute: ActivatedRoute, private router : Router, private tweetAppService : TweetAppServiceService){
   
   }

  ngOnInit(): void {
    if (!sessionStorage.getItem("userId") && !sessionStorage.getItem("token")) {
      this.router.navigate(["/login"])
    }
    else{
    this.token = sessionStorage.getItem("token")!;
    this.userName = sessionStorage.getItem("userId")!;
    this.routerParam = JSON.parse(this.activatedRoute.snapshot.params["tweet"]);
    this.likedUser = this.routerParam.likeUser.split(", ");
    }
  }

  redirect(tweet: any) {

    this.router.navigate(['/replytweet', JSON.stringify(tweet)]);
  }

  likePage(tweet: any) {
    this.router.navigate(['/liketweet', JSON.stringify(tweet)]);
  }

  likeUpdate(tweet: any) {
    this.tweetAppService.likeUserUpdate(this.userName, tweet.tweetId, this.token).subscribe((data) => {
      location.reload();
    })
  }

}
