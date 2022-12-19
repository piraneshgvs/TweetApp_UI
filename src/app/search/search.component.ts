import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';
import { TweetTable } from '../tweet-table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  search !: string;
  token !: string;
  @Input() public msg !: string[];
  userId !: string;
  statusok !: string;
  tweetDatas !: TweetTable;

  constructor(private router : Router,private activatedRoute : ActivatedRoute,private tweetAppService : TweetAppServiceService){
   
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    console.log(sessionStorage.getItem("key"))
    sessionStorage.removeItem("key");
    console.log(sessionStorage.getItem("key"))
    console.log("destroyed");
  }
  ngOnInit(): void {
    if(sessionStorage.getItem("userId")&&sessionStorage.getItem("token")){
      
      this.token = sessionStorage.getItem("token")!;
      this.userId = sessionStorage.getItem("userId")!;
    }
    else{
      this.router.navigate(["/login"])
    }
   
  }

  userTweets(m : string){
    this.tweetAppService.getAllUserTweets(this.token, m).subscribe({
      next:(data)=>{
        console.log(data);
        this.tweetDatas = data;
        this.router.navigate(['/alltweet', JSON.stringify(this.tweetDatas)]);
      },
    })
  }




  }

