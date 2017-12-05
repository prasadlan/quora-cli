import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AnswerService {

  /**
   * List of URLs used by services to make a http request.
   */
  private saveAnswerUrl = 'http://localhost:3000/answer/put';

  constructor(private http: Http) { }

  saveAnswer(answerobj: Object) {
    const header = new Headers({ 'Content-Type': 'application/json' });
    header.append('access-control-allow-origin' ,'*');
    let options = new RequestOptions({ headers: header });
    let user_id = JSON.parse(localStorage.getItem('currentUser')).user.id;
    
    answerobj['user_id'] = user_id;
    console.log(answerobj);
    return this.http.post(this.saveAnswerUrl, answerobj, options).map(data => data.json()).toPromise();
  }

  /**
   * Service to post an answer to question.
   * 
   * @param value 
   * parameter value is the answer posted for a question.
   * @param question_id 
   * parameter question_id is the question id for which answer is posted.
   */
  postAnswer(value, question_id) {
    let obj = {
      name: value.answer,
      question_id: question_id,
      is_anonymous: false
    }
    console.log(obj);
    this.saveAnswer(obj).then(data => {
      if(data.success == true){
        console.log("Answer saved !");
      } else{
        console.log("Answer not saved !");
      }
    });
  }

}
