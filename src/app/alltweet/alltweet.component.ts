import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';
import { TweetTable } from '../tweet-table';


@Component({
  selector: 'app-alltweet',
  templateUrl: './alltweet.component.html',
  styleUrls: ['./alltweet.component.css']
})
export class AlltweetComponent {


  userName!: string;
  tweetTable!: TweetTable[];
  panelOpenState = false;
  likeChange!: true;
  token !: string;

  constructor(private tweetAppService: TweetAppServiceService, private router: Router) {

  }


  ngOnInit(): void {
    if (!sessionStorage.getItem("userId") && !sessionStorage.getItem("token")) {
      this.router.navigate(["/login"])
    }
    else {
      this.token = sessionStorage.getItem("token")!;
      this.userName = sessionStorage.getItem("userId")!;
      this.getTweets();
    }
  }

  getTweets() {
    this.tweetAppService.getAllTweets(this.token, this.userName).subscribe((data) => {
      console.log(data);
      this.tweetTable = data;
    })

  }

  redirect(tweet: any) {

    this.router.navigate(['/replytweet', JSON.stringify(tweet)]);
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

}
