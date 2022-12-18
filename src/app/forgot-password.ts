export class ForgotPassword {

    userName : string;
    securityQuestion1 : string;

    constructor(userName : string, securityQuestion1 : string){
        this.userName = userName;
        this.securityQuestion1 = securityQuestion1;
    }
}
