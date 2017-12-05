import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  /**
   * property to store list of all questions.
   */
  questions: any = {};
  /**
   * property to get search text.
   */
  searchTerm = '';
  /**
   * property to store list of search results.
   */
  questionResults = [];
  /**
   * property to store response returned by service based on the input search term property.
   */
  private queryText = '';
  constructor(private userService: UserService, private router: Router, private homeService: HomeService) { }

  /**
   * Default onload function. Loads when component is loaded.
   */
  ngOnInit() {
    this.getQuestions();
    this.searchTerm = this.userService.searchString;
    console.log("searchTerm"+this.searchTerm);
    console.log("ser " + this.userService.questions);
    if(this.userService.questions.length != 0) {
      for(let i = 0; i < this.userService.questions.length; i++) {
        this.questions[i] = this.userService.questions[i];
      }
    }
    else {
      this.questions = ['No results!'];
    }
  }

  /**
   * Function to get a list of all recent questions and their top answer if any.
   * Sets the returned value, list of questions, to the property 'questions'.
   */
  getQuestions() {
    this.homeService.getQuestions().then(data => {
      console.log(data);
      if(data.success == true){
        this.questions = data.body
      } else{
        console.log("not success");
      }
    });
    console.log(this.questions); 
  }

  /**
   * Function to get filtered questions based on the search term.
   * 
   * @param searchTerm 
   * parameter searchTerm is the input value from search bar.
   */
  onSubmit(searchTerm:string) {
    this.userService.searchString = searchTerm;
    this.queryText = searchTerm;

    this.searchTerm = '';

    this.homeService.getSearch(searchTerm).then(data => {
      console.log(data);
      if(data.sucess){
        this.questionResults = data.body
        this.userService.questions = this.questionResults;
        this.queryText = '';
        this.router.navigate(['/search-results']);
      } else{
        console.log("not success");
      }
    });
    console.log(this.questionResults);
  }

  /**
   * Function to logout current user.
   */
  logout() {
    this.router.navigate(['/login']);
  }
  
}
