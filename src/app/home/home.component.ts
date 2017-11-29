import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
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
  answerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private homeService: HomeService){//, private answerService: AnswerService) {
    this.askquestionform = fb.group({
      'question': ['']
    });
    // this.answerForm = fb.group({
    //   'answerQ': ['']
    // });
  }

  ngOnInit() {
    this.getQuestions();
  }

  // postAnswer(value, question_id) {
  //   this.answerService.postAnswer(value, question_id);
  //   this.getQuestions();
  // }

  getQuestions() {
    this.homeService.getQuestions().then(data => {
      console.log(data);
      if(data.success == true){
        this.questions = data.body;

      } else{
        console.log("not success");
      }
    });
    console.log(this.questions); 
  }

  askQuestion(value): void {
    this.homeService.askQuestion(value.question)
      .then(data => {
        console.log("saved !"); 
        this.statusMessage = 'Question posted successfully';
        this.askquestionform.reset();
        this.getQuestions();
      });
  }

}
