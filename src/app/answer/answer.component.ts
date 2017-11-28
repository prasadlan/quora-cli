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
    this.home.getQuestions().then(data => {
      if(data.success == true){
        this.questions = data.body;

      } else{
        console.log("not success");
      }
    });;
    console.log(this.questions); 
  } 

  postAnswer(value) {
    let obj = {
      name: value.answer,
      question_id: value.question_id,
      is_anonymous: false
    }
    console.log(obj);
    this.answerService.saveAnswer(obj).then(data => {
      if(data.success == true){
        console.log("Answer saved !");
      } else{
        console.log("Answer not saved !");
      }
    });
  }

}
