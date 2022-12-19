import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  searchTweet !: TweetTable[];
  errorMessage !: string;

  constructor(private tweetAppService: TweetAppServiceService, private router: Router, private activatedRoute : ActivatedRoute) {

  }


  ngOnInit(): void {
    try {
      this.searchTweet = JSON.parse(this.activatedRoute.snapshot.params["data"]);
    } catch (error) {
      this.errorMessage = "No Tweets Found"
    }
   
    if (!sessionStorage.getItem("userId") && !sessionStorage.getItem("token")) {
      this.router.navigate(["/login"])
    }
    else if(this.searchTweet!=null){
      this.tweetTable = this.searchTweet;
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
      if(data==null){
        this.errorMessage="No Tweets Found"
      }
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
