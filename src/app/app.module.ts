import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MdButtonModule, MdListModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatGridListModule, MatInputModule, MdTabsModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './answer/answer.component';

import { User } from './models/user';

import { environment } from '../environments/environment';

import { HomeService } from './home.service';
import { UserService } from './services/user.service';
import { FilterComponent } from './filter/filter.component';
import { ProfileComponent } from './profile/profile.component';

export const router: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'answers', component: AnswerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
   ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AnswerComponent,
    FilterComponent,
    ProfileComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MatInputModule,
    MdTabsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      router
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ 
    HomeService,
    UserService],
  bootstrap: [ 
    AppComponent
    // HomeComponent,
    // LoginComponent,
    // AnswerComponent,
    // ProfileComponent
  ]
})
export class AppModule { }
