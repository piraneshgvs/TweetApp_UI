import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ReplyTweetTable } from '../reply-tweet-table';
import { TweetAppServiceService } from '../tweet-app-service.service';
import { TweetTable } from '../tweet-table';

@Component({
  selector: 'app-replytweet',
  templateUrl: './replytweet.component.html',
  styleUrls: ['./replytweet.component.css']
})
export class ReplytweetComponent implements OnInit{

  forGrp !: FormGroup;
  routerParam !: any;
  replyTweetObject !: ReplyTweetTable[];
  replyTweetData !: ReplyTweetTable;
  token !: string;
  userName !: string;

  constructor(private activatedRoute: ActivatedRoute, private router : Router, private tweetAppService : TweetAppServiceService, private fb : FormBuilder){
    this.replyTweetData = new ReplyTweetTable(null, null, "",new Date(),"")
    this.createForm();
   }
  ngOnInit(): void {
    if (!sessionStorage.getItem("userId") && !sessionStorage.getItem("token")) {
      this.router.navigate(["/login"])
    }
    else{
    this.routerParam = JSON.parse(this.activatedRoute.snapshot.params["tweet"]);
    this.token = sessionStorage.getItem("token")!;
      this.userName = sessionStorage.getItem("userId")!;
    this.getReplyTweet(this.routerParam.tweetId);
    }
  }

  createForm(){
    this.forGrp = this.fb.group({
      tweet:  ['', [Validators.required, Validators.maxLength(144), Validators.minLength(5)] ],
    })
  }

  getReplyTweet(id:any){
    this.tweetAppService.getReplyTweets(this.token,id).subscribe({
      next:(data)=>{
      this.replyTweetObject = data;
      //console.log(this.replyTweetObject);
      },
    })
  }

  newReply(replyTweet : any){
    this.replyTweetData.replytweet = this.forGrp.get('tweet')?.value;
    this.replyTweetData.tweetId = replyTweet.tweetId;
    this.replyTweetData.userId = this.userName;
    //console.log(this.replyTweetData);
    this.tweetAppService.postReplyTweet(this.token, this.replyTweetData).subscribe({
      next:(data)=>{
        console.log(data.validationMessage);
        if(data.validationMessage=="Reply Updated Successfully!!!"){
         // console.log(data);
          this.getReplyTweet(replyTweet.tweetId);
          this.resetForm(this.forGrp);
        }
      },
    })
  }

  resetForm(form: FormGroup) {
    form.reset();
}


likePage(tweet: any) {
  this.router.navigate(['/liketweet', JSON.stringify(tweet)]);
}

  
  

}
