import { browser, by, element, protractor } from 'protractor';

var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 75ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(15);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

export class SearchPage {
    navigateTo(path = '/search') {
        return browser.get(path);
    }
    
   
}