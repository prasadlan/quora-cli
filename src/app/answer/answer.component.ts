import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { AnswerService } from '../services/answer.service';
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

  constructor(private fb: FormBuilder, private router: Router, private home:HomeService, private answerService:AnswerService) {
    this.answerform = fb.group({
      'answer': [''],
      'question_id': ['']
    });
  }

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

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.home.getUnansweredQuestionUrl().then(data => {
      if(data.success == true){
        this.questions = data.body;

      } else{
        console.log("not success");
      }
    });;
    console.log(this.questions); 
  } 

  postAnswer(value, question_id) {
    this.answerService.postAnswer(value, question_id);
    this.getQuestions();
  }

}
