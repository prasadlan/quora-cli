import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http'; 
import { UserService } from '../services/user.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question  = '';
  answers = [];
  question_name = '';

  questionResults = [];
  
    private queryText = '';
    searchTerm = '';
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private homeService:HomeService) {
    
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

  onSubmit(searchTerm:string) {
    
        this.userService.searchString = searchTerm;
        this.queryText = searchTerm;
    
        this.searchTerm = '';

        this.homeService.getSearch(searchTerm).then(data => {
          console.log(data);
          if(data.sucess){
            this.questionResults = data.body
            this.userService.questions = this.questionResults;
            
            this.queryText = '';
  
            this.router.navigate(['/search-results']);
          } else{
            console.log("not success");
          }
        });
        console.log(this.questionResults);
      }

  logout() {
    this.router.navigate(['/login']);
  }
}
