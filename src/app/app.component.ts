import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TweetApp_UI';

  statusok !: string;

  constructor (private router : Router){
   
  }

  token !: string;
  data !: string[];

  newtweet(){
      this.router.navigate(["/newtweet"]);
  }

  loggedIn(){
    this.token = sessionStorage.getItem('token')!;
    if(this.token){
    return true;
    }
    return false;
  }

  status(){
    this.statusok = sessionStorage.getItem("key")!;
    if(this.statusok){
      return true;
    }
    return false;
  }

  handleResults(searchObj : string[]){
    this.data = searchObj;
    
  }
}
