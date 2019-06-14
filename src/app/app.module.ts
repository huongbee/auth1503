import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { Route, RouterModule } from '@angular/router';
import { UserService } from './service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { userReducer } from './ngrx/reducer';
import { StoreModule } from '@ngrx/store';
import { CheckUserLogin } from './guard/authenticate.guard';


const routeList: Route[] = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', component: HomeComponent, canActivate: [ CheckUserLogin ] }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routeList),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer
    }),
  ],
  providers: [UserService, CheckUserLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
