import { LoginPage } from './login.po';

describe('quora-cli App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should display fullname input', () => {
    const fullNameInput = page.getFullNameInput();
    expect(fullNameInput).toBeTruthy();
  });

  it('should display username input', () => {
    const userNameInput = page.getUserNameInput();
    expect(userNameInput).toBeTruthy();
  });

  it('should display email input', () => {
    const emailInput = page.getEmailInput();
    expect(emailInput).toBeTruthy();
  });

  it('should display password input', () => {
    const passwordInput = page.getPasswordInput();
    expect(passwordInput).toBeTruthy();
  });

//   it('should display signup page', () => {
//     page.navigateTo('/');    
//   });

//   it('should display home page', () => {
//     page.navigateTo('/home');    
//   });

//   it('should display answers page', () => {
//     page.navigateTo('/answers');    
//   });

  it('should fill in the signup form', () => {
    page.navigateTo('/');
    
    let fullname = page.getFullNameInput();
    let username = page.getUserNameInput();
    let email = page.getEmailInput();
    let password = page.getPasswordInput();
    fullname.sendKeys('Prasad Lanka');
    username.sendKeys('prasad.lanka');
    email.sendKeys('prasadlanka@gmail.com');
    password.sendKeys('password');

    expect(fullname.getAttribute('value')).toEqual('Prasad Lanka');
    expect(username.getAttribute('value')).toEqual('prasad.lanka');
    expect(email.getAttribute('value')).toEqual('prasadlanka@gmail.com');
    expect(password.getAttribute('value')).toEqual('password');

    let btn = page.getSignUpButton().click;
});
  
});