import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';
import { TweetTable } from '../tweet-table';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css']
})
export class NewTweetComponent implements OnInit  {

  forGrp !: FormGroup;
  newTweet !: TweetTable;
  errorMessage !: string;
  token !: string;

  ngOnInit(): void {
    if(sessionStorage.getItem("userId")&&sessionStorage.getItem("token")){
      this.newTweet = new TweetTable(null, "","",new Date(),null,"");
      this.newTweet.userId = sessionStorage.getItem("userId")!;
      this.token = sessionStorage.getItem("token")!;
    }
    else{
      this.router.navigate(["/login"])
    }
  }

  constructor(private router : Router, private fb : FormBuilder, private tweetAppService : TweetAppServiceService){
    this.createForm();
  }

  createForm(){
    this.forGrp = this.fb.group({
      tweet:  ['', [Validators.required, Validators.maxLength(144), Validators.minLength(5)] ],
    })
  }

  onSubmit(){
    this.newTweet.rootTweet = this.forGrp.get('tweet')?.value;
    this.tweetAppService.postNewTweet(this.token, this.newTweet).subscribe({
      next:(data)=>{
          if(data.jwttoken==="Tweet Successfully Created"){
            this.router.navigate(["/mytweet"]);
          }
          else{
            this.errorMessage=data.message;
          }
  
      },
      error:(error)=>{
        console.log(error.errorMessage);
    }
    })
  }

}
