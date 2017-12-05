import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
// import { AnswerService } from '../services/answer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: any = {};
  statusMessage: string;
  askquestionform: FormGroup;
  currentUser = '';
  isConnected = false;
  
  form: FormGroup;
  status: string;

  questionResults = [];

  private queryText = '';
  searchTerm = '';

  constructor(private userService: UserService, private cd: ChangeDetectorRef, private fb: FormBuilder, private router: Router, private homeService: HomeService) {
    this.askquestionform = fb.group({
      'question': ['']
    });
  }

  /**
   * Default onload function. Loads when component is loaded.
   */
  ngOnInit() {
    this.getQuestions();
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
   * Function to post a new question.
   *  
   * @param value 
   * value parameter is used to get the question text.
   */
  askQuestion(value): void {
    this.homeService.askQuestion(value.question)
      .then(data => {
        console.log("saved !"); 
        this.statusMessage = 'Question posted successfully';
        this.askquestionform.reset();
        this.getQuestions();
      });
  }

  /**
   * Function to upvote and undo upvote for an answer to a question.
   * 
   * @param event
   * event parameter is used to link the click event to the upvote button clicked. 
   */
  upvote(event): void {
    event.preventDefault();
    let upvoteEl = event.srcElement;
    console.log(upvoteEl);
    console.log(upvoteEl.classList.contains('upvote'));
    let textStr = upvoteEl.getElementsByClassName('mat-button-wrapper')[0].innerHTML;
    if(upvoteEl.classList.contains('upvoted')){
      let count = parseInt(textStr.split("|")[1].trim()) - 1;
      textStr = textStr.split("|")[0] + "| " + count;
      upvoteEl.classList.remove('upvoted');
    } else{
      let count = parseInt(textStr.split("|")[1].trim()) + 1;
      textStr = textStr.split("|")[0] + "| " + count;
      upvoteEl.classList.add('upvoted');
    }
    upvoteEl.getElementsByClassName('mat-button-wrapper')[0].innerHTML = textStr;
  }

  /**
   * Function to get filtered questions based on the search term.
   * 
   * @param searchTerm 
   * parameter searchTerm is the input value from search bar.
   */
  onSubmit(searchTerm:string) {
    this.homeService.searchString = searchTerm;
    this.queryText = searchTerm;

    this.searchTerm = '';

    this.homeService.getSearch(searchTerm).then(data => {
      console.log(data);
      if(data.sucess){
        this.questionResults = data.body
        this.homeService.questions = this.questionResults;
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
