import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
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
  statusMessage: string;
  answerform: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _homeService:HomeService) {
    this.answerform = fb.group({
      'answer': ['']
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
    this.questions = this._homeService.getQuestions(); 
  }

  postAnswer(value): void {
    
  }

}
