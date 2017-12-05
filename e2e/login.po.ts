import { browser, by, element, protractor } from 'protractor';

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 75ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(10);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

export class LoginPage {
    navigateTo(path = '/login') {
        return browser.get(path);
    }
    
    getUserNameInput() {
        return element(by.css('#md-input-0'));
    }

    getPasswordInput() {
        return element(by.css('#md-input-1'));
    }

    getLoginButton() {
        return element(by.id('loginBtn'));
    }
}