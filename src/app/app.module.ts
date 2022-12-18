import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlltweetComponent } from './alltweet/alltweet.component';
import { MytweetComponent } from './mytweet/mytweet.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LiketweetComponent } from './liketweet/liketweet.component';
import { ReplytweetComponent } from './replytweet/replytweet.component';
import { NewTweetComponent } from './new-tweet/new-tweet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatecomponentComponent } from './updatecomponent/updatecomponent.component';
import { SearchComponent } from './search/search.component';


const router : Routes =[
  {path: "mytweet", component: MytweetComponent},
  {path: "alltweet", component: AlltweetComponent},
  {path: "myprofile", component: MyprofileComponent},
  {path: "replytweet/:tweet", component: ReplytweetComponent},
  {path: "newtweet", component: NewTweetComponent},
  {path: "login", component: LoginComponent},
  {path: "liketweet/:tweet", component: LiketweetComponent},
  {path: "register", component: RegisterComponent},
  {path: "forgotPassword", component: ForgotpasswordComponent},
  {path: "resetPassword", component: ResetPasswordComponent},
  {path: "updateTweet/:rootTweet/:tweetId", component: UpdatecomponentComponent},
  {path: "searchUser", component: SearchComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlltweetComponent,
    MytweetComponent,
    MyprofileComponent,
    LiketweetComponent,
    ReplytweetComponent,
    NewTweetComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetPasswordComponent,
    UpdatecomponentComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(router),
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }