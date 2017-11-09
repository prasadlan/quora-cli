import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { QUESTIONS } from './mock-questions';
import { Question } from './question';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  private questionUrl = '/questions';
  private askQnUrl = 'http://localhost:3000/question/ask'
  // private askQnUrl = '192.168.1.203:3000/question/ask'

  constructor(private http: Http) { 

  }

  getQuestions(): Question[] {
    return QUESTIONS;
  }

  // getQuestions() {
  //   return this.http.get(this.questionUrl)
  //                   .map(response => response.json())
  // }

  getQuestionsByCategory(id: number) {
    const url = `${this.questionUrl}/${id}`;
    return this.http.get(url)
                    .map(response => response.json())
  }

  askQuestion(question: string) {
    const header = new Headers({ 'Content-Type': 'application/json' });
    header.append('access-control-allow-origin' ,'*');
    let options = new RequestOptions({ headers: header });
    let user_id = JSON.parse(localStorage.getItem('currentUser')).user.id;
    let is_anonymous = false; // Hardcoded. Value needs to be fetched.
    
    let questionobj = {
      user_id: user_id,
      is_anonymous: is_anonymous,
      name: question
    }
    return this.http.post(this.askQnUrl, questionobj, options)
                    .map(response => response.json())
  }

  
}
