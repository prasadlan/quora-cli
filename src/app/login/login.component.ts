import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Router } from '@angular/router';
//import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;
  signinUser = new User();
  model: any = {};
  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    
  }

  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
  	const username = e.target.elements[0].value;
  	const password = e.target.elements[1].value;
    this.signinUser.username = username;
    this.signinUser.password = password;
    this.user.loginUser(username, password)
      .then(status => {
        console.log(status);
        if(status) {
          this.router.navigate(['home']);
          this.user.setUserLoggedIn();
        }
        else {
          this.router.navigate(['']);
        }
      }).catch(err => console.log(err));
    }

    @Output() createNewUserEvent = new EventEmitter();
    signupUser() {
      const signinuser = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      };
      console.log(this.signinUser);
      this.user.create(signinuser)
        .subscribe(status => {
          //localStorage.setItem('currentUser', JSON.stringify(this.signinUser));
          //this.flashMessage.show('invalid email',{timeout: 3000});
          this.user.setUserLoggedIn();
          this.router.navigate(['/home']);
        })
    }
}
