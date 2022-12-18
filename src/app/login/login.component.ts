import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtRequest } from '../jwt-request';
import { TweetAppServiceService } from '../tweet-app-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  jwtRequest !: JwtRequest;
  forGrp !: FormGroup;
  errorMessage !: string;
  userName !: string;

  constructor(private tweetAppService : TweetAppServiceService,  private router : Router, private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.jwtRequest = new JwtRequest("","");
    if(sessionStorage.getItem("token")){
     this.router.navigate(["/alltweet"])
      }
  }

  onSubmit(){
    this.jwtRequest.username = this.forGrp?.get('username')?.value;
    this.jwtRequest.password = this.forGrp?.get('password')?.value;
    if(this.jwtRequest.username.trim()&&this.jwtRequest.password.trim()){
    this.tweetAppService.autheticateUser(this.jwtRequest).subscribe({
      next:(data)=>{
        console.log(data);
        sessionStorage.setItem("token",data.jwtResponse);
        sessionStorage.setItem("userId",data.userId);
        sessionStorage.setItem("firstName",data.firstName);
        sessionStorage.setItem("lastName",data.lastName);
        sessionStorage.setItem("phoneNumber",data.phoneNo);
        sessionStorage.setItem("emailId",data.emailId);
        this.router.navigate(["/alltweet"]);
    },
    error: (error) => {
        this.errorMessage="Invalid Credentials!!!";
    }
    });
  }
  else{
    this.errorMessage="Please Enter valid username or password!!!";
  }
  }

  createForm() {
    this.forGrp = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }




}
