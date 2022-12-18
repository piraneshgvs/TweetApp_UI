import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';
import { TweetTable } from '../tweet-table';

@Component({
  selector: 'app-updatecomponent',
  templateUrl: './updatecomponent.component.html',
  styleUrls: ['./updatecomponent.component.css']
})
export class UpdatecomponentComponent implements OnInit {

   routerParam !: string;
   routerParam2 !: string;
   forGrp !: FormGroup;
   newTweet !: TweetTable;
   errorMessage !: string;
   token !: string;
   todo !: string;
 

   constructor(private tweetAppService : TweetAppServiceService,private router : Router, private fb : FormBuilder,private activatedRoute : ActivatedRoute){}


  ngOnInit(): void {
    if(sessionStorage.getItem("userId")&&sessionStorage.getItem("token")){
   this.routerParam = this.activatedRoute.snapshot.params["rootTweet"];
   this.routerParam2 = this.activatedRoute.snapshot.params["tweetId"];
   console.log(this.routerParam);
   this.createForm();
   this.newTweet = new TweetTable(null, "","",new Date(),null,"");
   this.newTweet.userId = sessionStorage.getItem("userId")!;
   this.token = sessionStorage.getItem("token")!;
    }
    else{
      this.router.navigate(["/login"])
    }
  }
 

  createForm(){
    this.forGrp = this.fb.group({
      tweet:  ['', [Validators.required, Validators.maxLength(144), Validators.minLength(5)] ],
    })
  }

  onSubmit(){
    this.newTweet.rootTweet = this.forGrp.get('tweet')?.value;
    this.newTweet.tweetId = Number(this.routerParam2);
    this.tweetAppService.updateTweet(this.token, this.newTweet).subscribe({
      next:(data)=>{
        console.log(data)
          if(data.validationMessage==="Tweet Updated Successfully!!!"){
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
