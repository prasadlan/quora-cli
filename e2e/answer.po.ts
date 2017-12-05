import { browser, by, element, protractor } from 'protractor';

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 75ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(25);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

export class AnswerPage {
    navigateTo(path = '/answers') {
        return browser.get(path);
    }
    
     getAnswerTextInput() {
        return element(by.css('#md-input-1'));
    }

    getPostQuestionBtn() {
        return element(by.css('#md-raised-button-2'));
    }

    getLogoutBtn() {
        return element(by.css('#md-button-0'));
    }
}