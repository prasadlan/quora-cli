import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {NgModule} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  /**
   * Username property
   */
  username: string;
  /**
   * Password property
   */
  password: string;
  /**
   * Form name of signin page
   */
  signinform: FormGroup;
  /**
   * 
   */
  signinUser = new User();

  constructor(private fb: FormBuilder, private router: Router, private user: UserService) { 
    this.signinform = fb.group({
      'username': [''],
      'password': ['']
    });
  }

  /**
   * Default onload function. Loads when component is loaded.
   */
  ngOnInit() {
    console.log("ngInit of login");
  }

  /**
   * Function to let user login. 
   * User is allowed to login only if he has already signedup.
   * 
   * @param e
   * e parameter is the form value object which has username and password fields in it. 
   */
  loginUser(e) {
  	console.log(e);
  	const username = e.username;
  	const password = e.password;
    this.signinUser.username = username;
    this.signinUser.password = password;
    this.user.loginUser(username, password)
      .subscribe(status => {
        // console.log(status);
        // if(status) {
        //   console.log(status);
          this.user.setUserLoggedIn();
          this.router.navigate(['home']);
        // }
        // else {
        //   this.router.navigate(['login']);
        // }
      });
    }
}
