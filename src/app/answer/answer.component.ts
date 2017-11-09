import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { AnswerService } from '../services/answer.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  questions: Question[];
  answerform: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private home:HomeService, private answer:AnswerService) {
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

  getQuestions(): void {
    this.questions = this.home.getQuestions(); 
  }

  postAnswer(value): void {
    let obj = {
      answer: value.answer,
      question_id: value.question_id,
      is_anonymous: false
    }
    this.answer.saveAnswer(obj)
    .subscribe((res: Response) => {
      
    });
  }

}
