import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule, MdListModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatGridListModule, MatInputModule, MdTabsModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { AnswerComponent } from '../answer/answer.component';
import { HomeService } from '../home.service';
import { ValidateService } from './validate.service';
import { UserService } from './user.service';
import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        AnswerComponent
      ],
      imports: [
        RouterTestingModule,
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
        FormsModule
      ],
      providers: [AnswerService]
    });
  });

  it('should be created', inject([AnswerService], (service: AnswerService) => {
    expect(service).toBeTruthy();
  }));
});
