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

export class HomePage {
    navigateTo(path = '/home') {
        return browser.get(path);
    }

    getQuestionTextInput() {
        return element(by.css('#md-input-1'));
    }

    getAskQuestionBtn() {
        return element(by.css('#md-raised-button-2'));
    }

    getLogoutBtn() {
        return element(by.css('#md-button-0'));
    }


}