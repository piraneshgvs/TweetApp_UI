import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from '../forgot-password';
import { JwtRequest } from '../jwt-request';
import { TweetAppServiceService } from '../tweet-app-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
    
  
  forgotPassword !: ForgotPassword;
  forGrp !: FormGroup;
  errorMessage !: string;
  userName !: string;

  constructor(private tweetAppService : TweetAppServiceService,  private router : Router, private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.forgotPassword = new ForgotPassword("","");
   /* if(sessionStorage.getItem("userName")&&sessionStorage.getItem("token")){
     this.router.navigate(["/alltweet"])
      }*/
  }

  onSubmit(){
    this.forgotPassword.userName = this.forGrp?.get('username')?.value;
    this.forgotPassword.securityQuestion1 = this.forGrp?.get('securityQuestion')?.value;
    if(this.forgotPassword.userName.trim()&&this.forgotPassword.securityQuestion1.trim()){
    this.tweetAppService.forgotPassword(this.forgotPassword).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.jwttoken!="Not a valid Request"){
        sessionStorage.setItem("userName",this.forgotPassword.userName);
        sessionStorage.setItem("f-token",data.jwttoken);
        this.router.navigate(["/resetPassword"]);
        }
        else{
          this.errorMessage="Incorrect username or security answer"
        }
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
      securityQuestion: ['', Validators.required ]
    });
  }


}
