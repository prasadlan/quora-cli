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
  questions: any = {};
  statusMessage: string;
  askquestionform: FormGroup;
  id: string;
  
  constructor(private fb: FormBuilder, private router: Router, private home: HomeService) {
    this.askquestionform = fb.group({
      'question': ['']
    });
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.home.getQuestions().then(data => {
      var body = JSON.stringify(data.body);
      console.log('Questions obtained from backend: '+ body);
      if(data.success == true){
        this.questions = data.body

      } else{
        console.log("not success");
      }
    });
    console.log(this.questions); 
  }


  askQuestion(value): void {
    this.home.askQuestion(value.question)
      .then(data => {
        console.log("saved !"); 
        this.statusMessage = 'Question posted successfully';
        this.askquestionform.reset();
        this.getQuestions();
      });
  }

}
