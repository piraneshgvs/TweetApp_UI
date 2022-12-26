import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from '../user-details';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  userDetails !: UserDetails;

  constructor(private router : Router){
    this.userDetails = new UserDetails("","","","","","","","","");
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("userId") && !sessionStorage.getItem("token")) {
      this.router.navigate(["/login"])
    }
    else{
     this.userDetails.userId = sessionStorage.getItem("userId")!;
     console.log(this.userDetails.userId);
     this.userDetails.firstName = sessionStorage.getItem("firstName")!;
     this.userDetails.lastName = sessionStorage.getItem("lastName")!;
     this.userDetails.contactNumber = sessionStorage.getItem("phoneNumber")!;
     this.userDetails.emailId = sessionStorage.getItem("emailId")!;
    }
  }

}
