export class UserDetails {

    jwtResponse : string;
    userId : string;
    firstName : string;
    lastName : string;
    contactNumber : string;
    emailId : string;
    securityQuestion : string;
    password : string;
    confirmPassword : string;

    constructor(jwtResponse : string, userId : string, firstName : string, lastName : string, contactNumber : string, emailId : string, securityQuestion : string, password : string, confirmPassword : string){
        this.jwtResponse = jwtResponse;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.emailId = emailId;
        this.securityQuestion = securityQuestion;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

}
