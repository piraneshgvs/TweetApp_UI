import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userId !: string;
  phoneNumber !: string;
  forGrp !: FormGroup;
  search !: string;
  @Output() public found = new EventEmitter<any>();
  searchList !: string[];
  token !: string;

  constructor(private router : Router,  private fb : FormBuilder,private tweetAppService : TweetAppServiceService){
    this.createForm();
  }

  ngOnInit(): void {
    
  }

  loggedIn(){
    this.userId = sessionStorage.getItem("userId")!;
    this.phoneNumber = sessionStorage.getItem("phoneNumber")!;
    if(this.userId&&this.phoneNumber){
      return true;
    }
    return false;
  }

  searchUser(){
    if(sessionStorage.getItem("userId")&&sessionStorage.getItem("token")){
      this.token = sessionStorage.getItem("token")!;
      this.userId = sessionStorage.getItem("userId")!;
    }
    this.search = this.forGrp?.get('search')?.value; 
     this.searchRequest(this.search);
  }

  createForm() {
    this.forGrp = this.fb.group({
      search: ['', Validators.required ]
    });
  }

 clearSession(){
  this.token = sessionStorage.getItem("token")!;
  this.userId = sessionStorage.getItem("userId")!;
  this.tweetAppService.logoutLogging(this.token, this.userId).subscribe({
    next:(data)=>{
     if(data.validationMessage=="Successfully Logged out!!!"){
      //console.log("Logged Out")
     }
    }
  })
 sessionStorage.clear();
   
   
  }

  searchRequest(search : string){
    this.tweetAppService.searchUsers(this.token, this.userId, search).subscribe({
      next:(data)=>{
          this.searchList = data;
          this.router.navigate(["/searchUser"]);
          sessionStorage.setItem("key","ok");
          this.found.emit(this.searchList);
          //console.log(this.searchList)
          
        
      },
      error:(error)=>{
        console.log(error.errorMessage);
    }
  });
  }

}
