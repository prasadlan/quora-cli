import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { QUESTIONS } from './mock-questions';
import { Question } from './question';

import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
    public questions = [];
    searchString = "";

  /**
   * List of URLs used by services to make a http request.
   */
  private searchUrl = 'http://localhost:3000/search/question?index=quora&type=questions&value=';
  private unansweredQuestionUrl = 'http://localhost:3000/question/getUnanswered';
  private questionUrl = 'http://localhost:3000/question/getAll';
  private askQnUrl = 'http://localhost:3000/question/ask';
  private upvoteUrl = 'http://localhost:3000/question/upvote';
  private saveAnswerUrl = 'http://localhost:3000/answer/put';

  constructor(private http: Http) { 

  }

  /**
   * Service to get a list of all unanswered questions.
   */
  getUnansweredQuestionUrl() {
    return this.http.get(this.unansweredQuestionUrl).map(data => data.json()).toPromise();
  }

  /**
   * Service to get list of questions that match the search text.
   * 
   * @param val 
   * val parameter is the string used to search for questions.
   */
  getSearch(val: string) {
    const url= this.searchUrl + val;
    return this.http.get(url).map(data => data.json()).toPromise();
  }

  /**
   * Service to get all latest questions for home page.
   * HTTP request of type GET and url questionUrl
   */
  getQuestions() {
    return this.http.get(this.questionUrl).map(data => data.json()).toPromise();
  }

  /**
   * Service to post a new question.
   * HTTP request of type POST and url askQnUrl.
   * 
   * @param question
   * question parameter with question text to be saved. 
   */
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
                    .map(response => response.json()).toPromise();
  }

  
}
