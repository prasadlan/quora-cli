import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: Question[];

  constructor(private _homeService:HomeService) {

  }

  ngOnInit() {
    this.getQuestions();
    console.log(this.questions);
  }

  getQuestions(): void {
    this.questions = this._homeService.getQuestions(); 
  }

}


