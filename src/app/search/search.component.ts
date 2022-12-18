import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search !: string;
  token !: string;
  @Input() msg !: string[];
  userId !: string;

  constructor(private router : Router,private activatedRoute : ActivatedRoute,private tweetAppService : TweetAppServiceService){

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

 



  }

