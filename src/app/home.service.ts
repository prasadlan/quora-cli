import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { QUESTIONS } from './mock-questions';
import { Question } from './question';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

  private questionUrl = '/questions';

  constructor(private http: Http) { 

  }

  getQuestions(): Question[] {
    return QUESTIONS;
  }
  // getQuestions() {
  //   return this.http.get(this.questionUrl)
  //                   .map(response => response.json())
  //                   .subscribe(res => this.questions = res)
  // }

  // getQuestionsByCategory(id: number) {
  //   const url = `${this.questionUrl}/${id}`;
  //   return this.http.get(url)
  //                   .map(response => response.json())
  //                   .subscribe(res => this.questions = res)
  // }
}
