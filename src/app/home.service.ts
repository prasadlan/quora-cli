import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { QUESTIONS } from './mock-questions';
import { Question } from './question';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  private questionUrl = '/questions';
  private askQnUrl = '/question/add';

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
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.askQnUrl, question, options)
                    .map(response => response.json())
  }

  
}
