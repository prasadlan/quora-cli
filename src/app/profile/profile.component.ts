import { Component, OnInit, Inject } from '@angular/core';
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
  fullname : string;
  email : string;
  currentUserSubscription: Subscription;
  constructor(
    private route: Router,
    private userService: UserService,
    // public dialog: MdDialog
    // @Inject('media') private mediaService
  ) {}

  // profile: Profile;
  // currentUser: User;
  // isUser: boolean;

  ngOnInit() {
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

  // uploadImg(event){
  //   var image = event.target.files[0];

  //   var pattern = /image-*/;
  //   var reader = new FileReader();

  //   if (!image.type.match(pattern)){
  //     console.error('File is not an image!');
  //     alert("The file is not an image, Please select an image");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", image);
  //   this.mediaService.uploadImg(image)
  //     .then(res =>{
  //       console.log("Upload successfully!");
  //   })
    
  // }

}
