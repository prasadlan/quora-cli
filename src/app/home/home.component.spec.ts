import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule, MdListModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatGridListModule, MatInputModule, MdTabsModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from '../login/login.component';
import { AnswerComponent } from '../answer/answer.component';

import { HomeComponent } from './home.component';
import { HomeService } from '../home.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
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
      providers: [ HomeService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render an user profile icon button', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('GO!');
  }));

  it('should render atleast one card', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-card')).length >= 1;
  }));

  it('should render home page navigation list', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-nav-list')).length == 1;
  }));
});
