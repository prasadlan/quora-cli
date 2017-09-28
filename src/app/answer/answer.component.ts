import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  questions: Question[];
  statusMessage: string;

  constructor(private _homeService:HomeService) {

  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questions = this._homeService.getQuestions(); 
  }

}
