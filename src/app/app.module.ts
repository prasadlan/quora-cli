import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';

import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatGridListModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './answer/answer.component';

import { HomeService } from './home.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AnswerComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MatInputModule
  ],
  providers: [ HomeService ],
  bootstrap: [ 
    AppComponent,
    HomeComponent
  ]
})
export class AppModule { }
