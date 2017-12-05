import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http'; 
import { UserService } from '../services/user.service';
import { HomeService } from '../home.service';
import { AnswerService } from '../services/answer.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question  = '';
  answers = [];
  question_name = '';

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

  constructor(private fb: FormBuilder, private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private homeService:HomeService, private answerService: AnswerService) {
    this.answerform = fb.group({
      'answer': [''],
      'question_id': ['']
    });
   }

   /**
    * Default onload function. Loads when component is loaded.
    */
   ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) =>{
      this.question = params['question'];
      const req = this.http.get('http://localhost:3000/question/get?question_id='+this.question);
  
      req.subscribe(
        res => {
          var response = res["_body"];
          console.log("question object of one question is: "+response['body']);
          console.log("question object  is: "+response);
          this.answers = JSON.parse(response)['body']['answers'];
          this.question_name = JSON.parse(response)['body']['question'];
        }
      );
    });
  }

  /**
   * Function to get all unanswered questions.
   * Sets the returned value, list of questions, to the property 'questions'.
   */
  getQuestions() {
    this.homeService.getUnansweredQuestionUrl().then(data => {
      if(data.success == true){
        this.questions = data.body;
        console.log("ans"+this.questions);
      } else{
        console.log("not success");
      }
    });
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
   * Function to post answer to the question.
   * 
   * @param value 
   * parameter value is the answer posted for a question.
   * @param question_id 
   * parameter question_id is the question id for which answer is posted.
   */
  postAnswer(value, question_id) {
    this.answerService.postAnswer(value, question_id);
    window.location.reload();
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
