import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Question } from '../question';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: Question[];
  statusMessage: string;
  askquestionform: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private home: HomeService) {
    this.askquestionform = fb.group({
      'question': ['']
    });
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questions = this.home.getQuestions(); 
  }

  askQuestion(value): void {
    this.home.askQuestion(value.question)
      .subscribe((res: Response) => {
        this.statusMessage = 'Question posted successfully';
      });
  }

}
