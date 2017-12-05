import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  /**
   * name property for full name of user
   */
  name: string;
  /**
   * username property
   */
  username: string;
  /**
   * email property
   */
  email: string;
  /**
   * password property
   */
  password: string;
  signupform: FormGroup;
  signinUser = new User();
  constructor(private fb: FormBuilder, private router: Router, private user: UserService) {
    this.signupform = fb.group({
      'username': [''],
      'name': [''],
      'email': [''],
      'password': ['']
    });
   }

  /**
   * Default onload function. Loads when component is loaded.
   */
  ngOnInit() {

  }

  /**
   * Function to create an account for user. 
   * User is allowed to login only if he can successfully signs up.
   * 
   * @param value 
   * value parameter is the form value object which has full name, email, username and password fields in it. 
   */
  signupUser(value) {
    const signinuser = {
      name: value.name,
      email: value.email,
      username: value.username,
      password: value.password
    }
    console.log(this.signinUser);
    this.user.create(signinuser)
      .subscribe(status => {
        //localStorage.setItem('currentUser', JSON.stringify(this.signinUser));
        this.user.setUserLoggedIn();
        this.router.navigate(['home']);
      });
  }

}
