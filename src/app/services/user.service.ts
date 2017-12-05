import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private isUserLoggedIn;
    public questions = [];
    searchString = '';
    user: any;
    authToken: any;
    constructor(private http: Http) { 
      this.isUserLoggedIn = false;
    }

    /**
     * Util function to set login status of user.
     */
    setUserLoggedIn() {
      this.isUserLoggedIn = true;
    }

    /**
     * Util function to get the login user status.
     */
    getUserLoggedIn() {
      return this.isUserLoggedIn;
    }

    /**
     * Util function to set login status of user to false after user logs out.
     */
    setUserLoggedOut() {
      this.isUserLoggedIn = false;
    }

    /**
     * Servie to get user details.
     * 
     * @param user
     * user parameter
     *  
     */
    getUser(user: User) {
      return this.http.get('/api/users/' + user, this.jwt()).map((response: Response) => response.json());
    }

    /**
     * Service to create an account for new user.
     * 
     * @param user 
     * user parameter of type User which contains user signup data.
     */
    create(user: User) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('access-control-allow-origin', '*');
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // console.log(localStorage.getItem('currentUser'));
        return this.http.post('http://localhost:3000/users/signup', user, {headers: headers})
        .map((response: Response) => {
          let user = response.json();
          console.log(user);
          if (user.success) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              console.log(localStorage.getItem('currentUser'));
            }
        });
    }
  
    
    // getProfile() {
    //   const headers = new Headers();
    //   this.loadToken();
    //   headers.append('Authorization', this.authToken);
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('access-control-allow-origin', '*');
    //   return this.http.get('http://localhost:3000/users/profile', { headers: headers })
    //     .map(res => res.json());
    // }
  
    // loadToken() {
    //   const token = localStorage.getItem('id_token');
    //   this.authToken = token;
    // }

    /**
     * Service to update user details.
     * 
     * @param user 
     * user parameter of type User which contains user updated data.
     */
    update(user: User) {
        return this.http.put('/api/users/' + user, user, this.jwt()).map((response: Response) => response.json());
    }

    // delete(user: User) {
    //     return this.http.delete('/api/users/' + user, this.jwt()).map((response: Response) => response.json());
    // }


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
    
    /**
     * Service to login user.
     * 
     * @param username 
     * username parameter to save login username.
     * @param password 
     * password parameter to save login password.
     * 
     */
    loginUser(username: string, password: string) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('access-control-allow-origin', '*');
      return this.http.post('http://localhost:3000/users/login', JSON.stringify({ username: username, password: password }), { headers: headers })
      .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let user = response.json();
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              console.log(localStorage.getItem('currentUser'));
            }
      });
    }

    /**
     * Service to logout user.
     */
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

    /**
     * Service that returns user profile of user based on username.
     * @param username 
     * username parameter
     * 
     */
    getUserInfoForProfile(username: string) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('access-control-allow-origin', '*');
      return this.http.get('http://localhost:3000/username/'+{username}, {headers : headers})
        .map((response: Response) => {
           console.log(response);
           console.log("Got user info successfully!");
        });
    }
}