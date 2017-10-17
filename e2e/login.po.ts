import { browser, by, element, protractor } from 'protractor';

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 75ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(75);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

export class LoginPage {
    navigateTo(path = '/') {
        return browser.get(path);
    }

    getFullNameInput() {
        return element(by.css('#md-input-0'));
    }
    
    getUserNameInput() {
        return element(by.css('#md-input-1'));
    }

    getEmailInput() {
        return element(by.css('#md-input-2'));
    }

    getPasswordInput() {
        return element(by.css('#md-input-3'));
    }

    getSignUpButton() {
        return element(by.id('signUpBtn'));
    }
}