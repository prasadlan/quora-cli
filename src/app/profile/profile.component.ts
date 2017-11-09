import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() {
  //   this.userService.getProfile().subscribe(profile => {
  //     this.user = profile.user;
  //   },
  // err => {
  //   console.log('Error in profile component =>', err);
  //   return false;
  // });
  }

}
