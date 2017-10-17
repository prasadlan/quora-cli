import { browser, by, element } from 'protractor';

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