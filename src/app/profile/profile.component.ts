import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedOption: string;
  /**
   * Full name of the user.
   */
  fullname : string;
  /**
   * Email ID of the user.
   */
  email : string;
  currentUserSubscription: Subscription;
  /**
   * Reference URL to user profile picture.
   */
  imagesrc : string = './assets/LinkedInCover.jpg';
  constructor(
    private route: Router,
    private userService: UserService,
    private element: ElementRef
    // public dialog: MdDialog
    // @Inject('media') private mediaService
  ) {}

  // profile: Profile;
  // currentUser: User;
  // isUser: boolean;

  /**
   * Default onload function. Loads when component is loaded.
   */
  ngOnInit() {
    this.imagesrc = './assets/LinkedInCover.jpg';
  //   let User = JSON.parse(localStorage.getItem("currentUser"));
  //   if(User) {
  //     this.fullname = User.name; 
  //   }
  //   this.currentUserSubscription = this.userService.getUserInfoForProfile(this.fullname)
  //   .subscribe(newUserInfo => 
  //     { 
  //       this.fullname = newUserInfo.User.name;
  //       this.email = newUserInfo.User.email;
  //     }
  //   );
  // }

  // getcurrentuser() {
  //   let currentuser = JSON.parse(localStorage.getItem("currentUser"));
  //   if(currentuser) {
  //     this.fullname = currentuser.name;
  //     this.email = currentuser.email;
  //   }
  }

  /**
   * Function to upload an image.
   * 
   * @param event 
   * event parameter is used to link the click event to the button clicked.
   */
  uploadImg(event){
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    var image = this.element.nativeElement.querySelector('.image');
    reader.onload = function(e: any) {
      var src = e.target.result;
      image.imagesrc = src;
    };
  }

}
