import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../models/user';

@Injectable()
export class MediaService {

  constructor(private _http: Http) { }

  /**
   * Service to update user avatar.
   * 
   * @param user 
   * user parameter to get user full name.
   */
  updateAvatar(user: User) {
    return this._http.put('users/updateavatar/' + user.name, user).map(data => data.json()).toPromise();
  }

}
