import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http'; 

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question  = '';
  answers = [];
  question_name = '';
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) =>{
      this.question = params['question'];
      const req = this.http.get('http://localhost:3000/question/get?question_id='+this.question);
      //var ques = JSON.stringify(this.question);
      //console.log(ques);
      //console.log('QUESTION OBJ IS' +ques['id']);
      req.subscribe(
        res => {
          var response = res["_body"];
          
          console.log("question object of one question is: "+response['body']);
          console.log("question object  is: "+response);
          this.answers = JSON.parse(response)['body']['answers'];
          this.question_name = JSON.parse(response)['body']['question'];
        }
      );
    });
  }

}
