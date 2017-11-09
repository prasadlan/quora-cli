import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  signupform: FormGroup;
  signinform: FormGroup;
  signinUser = new User();
  model: any = {};
  constructor(private fb: FormBuilder, private router: Router, private user: UserService) { 
    this.signupform = fb.group({
      'username': [''],
      'name': [''],
      'email': [''],
      'password': ['']
    });
    this.signinform = fb.group({
      'username': [''],
      'password': ['']
    });
  }

  ngOnInit() {
    
  }

  loginUser(e) {
  	console.log(e);
  	const username = e.username;
  	const password = e.password;
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
    signupUser(value) {
      const signinuser = {
        name: value.name,
        email: value.email,
        username: value.username,
        password: value.password
      };
      console.log(this.signinUser);
      this.user.create(signinuser)
        .subscribe(status => {
          //localStorage.setItem('currentUser', JSON.stringify(this.signinUser));
          this.user.setUserLoggedIn();
          this.router.navigate(['home']);
        })
    }
}
