import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MdButtonModule, MdAutocompleteModule, MdListModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MatGridListModule, MatInputModule, MdTabsModule, MatExpansionModule } from '@angular/material';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './answer/answer.component';

import { User } from './models/user';
import { Question } from './question';

import { environment } from '../environments/environment';

import { HomeService } from './home.service';
import { UserService } from './services/user.service';
import { AnswerService } from './services/answer.service';
// import { MediaService } from './services/media.service';
import { FilterComponent } from './filter/filter.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionComponent } from './question/question.component';

export const router: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'answers', component: AnswerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search-results', component: SearchResultsComponent},
  { path: 'question/:question', component: QuestionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

   ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AnswerComponent,
    FilterComponent,
    ProfileComponent,
    SearchResultsComponent,
    SignupComponent,
    QuestionComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    // NoopAnimationsModule,
    MdAutocompleteModule,
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
    FormsModule,
    RouterModule.forRoot(
      router,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ 
    HomeService,
    UserService,
    AnswerService
    // MediaService
  ],
  bootstrap: [ 
    AppComponent,
    HomeComponent,
    LoginComponent,
    AnswerComponent,
    ProfileComponent,
    SearchResultsComponent,
    SignupComponent
  ]
})
export class AppModule { }
