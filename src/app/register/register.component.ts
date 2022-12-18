import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetAppServiceService } from '../tweet-app-service.service';
import { UserDetails } from '../user-details';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  forGrp !: FormGroup;
  errorMessage !: string;
  userDetails !: UserDetails;

  constructor(private router : Router,  private fb : FormBuilder,private tweetAppService : TweetAppServiceService) { 
    this.createForm();
  }

  ngOnInit(): void {
      this.userDetails = new UserDetails("","","","","","","","","");
      if(sessionStorage.getItem("userName")&&sessionStorage.getItem("token")){
        this.router.navigate(["/defectivedetails"])
         }
  }


  createForm() {
    this.forGrp = this.fb.group({
      userId:  ['',[Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required] ],
      lastName: ['', [Validators.required] ],
      emailId: ['', [Validators.required,Validators.email]],
      contactNumber: ['', [Validators.required,Validators.pattern(/^\d{10}$/g)]],
      securityQuestion : ['', [Validators.required]],
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

 
  onSubmit(){
    this.userDetails.userId = this.forGrp?.get('userId')?.value;
    this.userDetails.contactNumber = this.forGrp?.get('contactNumber')?.value;
    this.userDetails.emailId = this.forGrp?.get('emailId')?.value;
    this.userDetails.firstName = this.forGrp?.get('firstName')?.value;
    this.userDetails.lastName = this.forGrp?.get('lastName')?.value;
    this.userDetails.password = this.forGrp?.get('password')?.value;
    this.userDetails.securityQuestion = this.forGrp?.get('securityQuestion')?.value;
    this.userDetails.confirmPassword = this.forGrp?.get('confirmPassword')?.value;
    this.tweetAppService.postTheRegisteredDetails(this.userDetails).subscribe({
      next:(data)=>{
        console.log(data);
        if(data.validationMessage==="User Registered Successfully"){
          this.router.navigate(["/login"]);
        }
        else{
          this.errorMessage=data.validationMessage;
          
        }
      },
      error:(error)=>{
          console.log(error.errorMessage);
      }

      })


  }


}
