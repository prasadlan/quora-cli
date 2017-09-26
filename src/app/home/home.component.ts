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
  statusMessage: string;

  constructor(private _homeService:HomeService) {

  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questions = this._homeService.getQuestions(); 
  }

  askQuestion(question: string): void {
    this._homeService.askQuestion(question)
                      .subscribe((res: Response) => {
                        this.statusMessage = 'Question posted successfully';
                      });
  }

}


