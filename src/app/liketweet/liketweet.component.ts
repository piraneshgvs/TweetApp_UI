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

  constructor(private activatedRoute: ActivatedRoute, private router : Router, private tweetAppService : TweetAppServiceService){
   
   }

  ngOnInit(): void {
    this.routerParam = JSON.parse(this.activatedRoute.snapshot.params["tweet"]);
    this.likedUser = this.routerParam.likeUser.split(", ");
  }

  redirect(tweet: any) {

    this.router.navigate(['/replytweet', JSON.stringify(tweet)]);
  }

  likePage(tweet: any) {
    this.router.navigate(['/liketweet', JSON.stringify(tweet)]);
  }

}
