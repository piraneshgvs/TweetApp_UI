import { Component } from '@angular/core';
import { UserDetails } from '../user-details';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  userDetails !: UserDetails;

  constructor(){
    this.userDetails = new UserDetails("","","","","","","","","");
  }

  ngOnInit(): void {
     this.userDetails.userId = sessionStorage.getItem("userId")!;
     console.log(this.userDetails.userId);
     this.userDetails.firstName = sessionStorage.getItem("firstName")!;
     this.userDetails.lastName = sessionStorage.getItem("lastName")!;
     this.userDetails.contactNumber = sessionStorage.getItem("phoneNumber")!;
     this.userDetails.emailId = sessionStorage.getItem("emailId")!;
  }

}
