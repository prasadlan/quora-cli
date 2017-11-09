import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/user';

@Injectable()
export class UserService {
    private isUserLoggedIn;
    constructor(private http: Http) { 
      this.isUserLoggedIn = false;
    }

    setUserLoggedIn() {
      this.isUserLoggedIn = true;
    }

    getUserLoggedIn() {
      return this.isUserLoggedIn;
    }

    setUserLoggedOut() {
      this.isUserLoggedIn = false;
    }

    getUser(user: User) {
      return this.http.get('/api/users/' + user, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('access-control-allow-origin' ,'*');
        return this.http.post('http://localhost:3000/users/signup', user, {headers: headers})
        .map((response: Response) => response.json());
    }

    // update(user: User) {
    //     return this.http.put('/api/users/' + user, user, this.jwt()).map((response: Response) => response.json());
    // }

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

    loginUser(username: string, password: string) {
      return this.http.post('/users/login', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
          // login successful if there's a jwt token in the response
          console.log(username);
          console.log(password);
          let user = response.json();
          console.log(user);
          console.log(user.token);
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
          console.log(user.successful);
          return user.successful;
      }).toPromise();
    }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}