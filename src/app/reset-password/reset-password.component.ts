import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  password !: string;
  forGrp !: FormGroup;
  errorMessage !: string;
  userName !: string;
  token !: string;

  constructor(private tweetAppService : TweetAppServiceService,  private router : Router, private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("userId") && !sessionStorage.getItem("f-token") && !sessionStorage.getItem("token")) {
      this.router.navigate(["/login"])
    }

      if(sessionStorage.getItem("f-token")){
        this.token = sessionStorage.getItem("f-token")!;
        this.userName = sessionStorage.getItem("userId")!;
      }
      if(sessionStorage.getItem("token")){
        this.token = sessionStorage.getItem("token")!;
        this.userName = sessionStorage.getItem("userId")!;
      }
  }

  onSubmit(){
    this.password = this.forGrp?.get('password')?.value;
    console.log(this.userName);
    this.tweetAppService.resetPasswordRequest(this.token, this.userName, this.password).subscribe({
      next:(data)=>{
        if(data.message="Password updated successfully")
        alert("Password updated successfully");
        sessionStorage.clear();
        this.router.navigate(["/login"]);
    },
    error: (error) => {
        this.errorMessage="Something went wrong please try again!!!";
    }
    });
  }
  


  createForm() {
    this.forGrp = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['',Validators.required],
    },{
      validators:this.Mushmatch('password','confirmPassword')
    }
    );
  }

  Mushmatch(password:any, confirmPassword:any){
    return(formGroup:FormGroup)=>{
      const passwordControls = formGroup.controls[password];
      const confirmPasswordControls = formGroup.controls[confirmPassword];

      if(passwordControls.value!==confirmPasswordControls.value){
        confirmPasswordControls.setErrors({Mushmatch:true});
      }
      else {
        confirmPasswordControls.setErrors(null);
      }
    }
  }



  }

