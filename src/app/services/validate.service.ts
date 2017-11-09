import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateSignUp(user) {
    if (user.name === undefined || user.username === undefined || user.email === undefined || user.password === undefined
      || user.name === '' || user.email === '' || user.username === '' || user.password === '') {
        return false;
    } else {
        return true;
    }
  }

  validateEmail(email) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(email);
  }
}
