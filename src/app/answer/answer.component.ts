import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { AnswerService } from '../services/answer.service';
import { UserService } from '../services/user.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-answer',
  providers: [HomeService, AnswerService],
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})

export class AnswerComponent implements OnInit {
  questions: any = {};
  answerform: FormGroup;
  mdata: any = {};
  statusMessage: string;
  askquestionform: FormGroup;
  currentUser = '';
  isConnected = false;
  
  form: FormGroup;
  status: string;

  private queryText = '';
  searchTerm = '';
  questionResults = [];

  constructor(private fb: FormBuilder, private router: Router, private homeService:HomeService, private answerService:AnswerService, private userService: UserService) {
    this.answerform = fb.group({
      'answer': [''],
      'question_id': ['']
    });
  }

  /**
   * Default onload function. Loads when component is loaded.
   */
  ngOnInit() {
    this.getQuestions();
  }

  /**
   * Toggles the hidden text area in and out of view.
   * 
   * @param event 
   * event parameter is used to link the click event to the button clicked.
   */
  toggleAnswerDialog(event): void {
    let target = event.srcElement;
    let parent = target.parentNode;
    while(parent.nodeName != 'MD-CARD'){
      parent = parent.parentNode;
    }
    let answerdialog = parent.lastElementChild;
    if (answerdialog.style.display === "block") {
      answerdialog.style.display = "none";
    } else {
      answerdialog.style.display = "block";
    }
  }

  /**
   * Function to get all unanswered questions.
   * Sets the returned value, list of questions, to the property 'questions'.
   */
  getQuestions() {
    this.homeService.getUnansweredQuestionUrl().then(data => {
      if(data.success == true){
        this.questions = data.body;
        console.log(this.questions);
      } else{
        console.log("not success");
      }
    });
  } 

  /**
   * Function to post an answer for a question.
   * Question is removed from answers page as soon as it is answered.
   * 
   * @param value 
   * parameter value is the answer posted for a question.
   * @param question_id 
   * parameter question_id is the question id for which answer is posted.
   * @param event 
   * event parameter is used to link the click event to the submit button clicked.
   * 
   */
  postAnswer(value, question_id, event) {
    this.answerService.postAnswer(value, question_id);
    let target = event.srcElement;
    let parent = target.parentNode;
    while(parent.nodeName != 'MD-CARD') {
      parent = parent.parentNode;
    }
    
    parent.style.display = "none";
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
