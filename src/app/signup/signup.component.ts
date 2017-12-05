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
  name: string;
  username: string;
  email: string;
  password: string;
  signupform: FormGroup;
  signinUser = new User();
  model: any = {};
  constructor(private fb: FormBuilder, private router: Router, private user: UserService) {
    this.signupform = fb.group({
      'username': [''],
      'name': [''],
      'email': [''],
      'password': ['']
    });
   }

  ngOnInit() {

  }

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
