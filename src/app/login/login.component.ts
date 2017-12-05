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
  username: string;
  password: string;
  signinform: FormGroup;
  signinUser = new User();
  model: any = {};
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
   * 
   * @param e 
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
