import { Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public questions = [];
  searchTerm = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    
    this.searchTerm = this.userService.searchString;
    console.log("ser " + this.userService.questions);
    if(this.userService.questions.length != 0) {
      for(let i = 0; i < this.userService.questions.length; i++) {
        this.questions[i] = this.userService.questions[i];
      }
    }
    else {
      this.questions = ['No results!'];
    }
  }
  logout() {
    this.router.navigate(['/login']);
  }
  
}
