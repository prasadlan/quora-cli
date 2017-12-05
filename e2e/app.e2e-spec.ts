import { AppPage } from './app.po';
import { LoginPage } from './login.po';
import { SignupPage } from './signup.po';
import { HomePage } from './home.po';
import { AnswerPage } from './answer.po';
import { SearchPage } from './search.po';

/* E2E test for the app */
describe('Quora App', () => {
  // let page: AppPage;
  let signuppage: SignupPage;
  let loginpage: LoginPage;
  let homepage: HomePage;
  let answerpage: AnswerPage;
  let searchpage: SearchPage;
  let window: Window;

  // beforeEach(() => {
  //   page = new AppPage();
  // });

  /*Describe for Signup of user */
  describe('Signup page for a user', () => {
    beforeEach(() => {
      signuppage = new SignupPage();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should display fullname input', () => {
      const fullNameInput = signuppage.getFullNameInput();
      expect(fullNameInput).toBeTruthy();
    });
  
    it('should display username input', () => {
      const userNameInput = signuppage.getUserNameInput();
      expect(userNameInput).toBeTruthy();
    });
  
    it('should display email input', () => {
      const emailInput = signuppage.getEmailInput();
      expect(emailInput).toBeTruthy();
    });
  
    it('should display password input', () => {
      const passwordInput = signuppage.getPasswordInput();
      expect(passwordInput).toBeTruthy();
    });
  
    it('should fill in the signup form', () => {
      signuppage.navigateTo('/signup');
  
      let fullname = signuppage.getFullNameInput();
      let username = signuppage.getUserNameInput();
      let email = signuppage.getEmailInput();
      let password = signuppage.getPasswordInput();
      fullname.sendKeys('Prasad Lanka');
      username.sendKeys('prasad.lanka');
      email.sendKeys('prasadlanka@gmail.com');
      password.sendKeys('password');
  
      expect(fullname.getAttribute('value')).toEqual('Prasad Lanka');
      expect(username.getAttribute('value')).toEqual('prasad.lanka');
      expect(email.getAttribute('value')).toEqual('prasadlanka@gmail.com');
      expect(password.getAttribute('value')).toEqual('password');
  
      let signUpBtn = signuppage.getSignUpButton().click;
      });
  
      it('should display home page', () => {
      signuppage.navigateTo('/home');    
    });
  });

  /* Describe for login user */
  describe('Login page for a user', () => {
    beforeEach(() => {
      loginpage = new LoginPage();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
  
    it('should display username input', () => {
      const userNameInput = loginpage.getUserNameInput();
      expect(userNameInput).toBeTruthy();
    });
  
    it('should display password input', () => {
      const passwordInput = loginpage.getPasswordInput();
      expect(passwordInput).toBeTruthy();
    });
  
    it('should fill in the login form', () => {
      loginpage.navigateTo('/login');
  
      let username = loginpage.getUserNameInput();
      let password = loginpage.getPasswordInput();
      username.sendKeys('joy');
      password.sendKeys('joy');
  
      expect(username.getAttribute('value')).toEqual('joy');
      expect(password.getAttribute('value')).toEqual('joy');
  
      let loginBtn = loginpage.getLoginButton().click;
      });
  
      it('should display home page', () => {
      loginpage.navigateTo('/home');    
    });
  });

  /* Describe for home */ 
  describe('Home page for the user', () => {
    beforeEach(() => {
      homepage = new HomePage();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should display question input', () => {
      const questionInput = homepage.getQuestionTextInput();
      expect(questionInput).toBeTruthy();
    });

    it('should fill in the question form', () => {
      loginpage.navigateTo('/home');
  
      let questionInput = homepage.getQuestionTextInput();
      questionInput.sendKeys('Where is Gainesville?');
  
      expect(questionInput.getAttribute('value')).toEqual('Where is Gainesville?');

      let askQuestionBtn = homepage.getAskQuestionBtn().click;
    });

    it('It should logout', () => {
      let logoutBtn = homepage.getLogoutBtn().click;
      homepage.navigateTo('/login');
    });
  });

      
    // it('It should toggle answer button', () => {
    //   let answerToggleBtn = answerpage.getAnswerToggleBtn().click;
    // });

    // it('should display answer input', () => {
    //   const answerInput = answerpage.getAnswerTextInput();
    //   expect(answerInput).toBeTruthy();
    // });

    // it('should fill in the answer form', () => {
    //   loginpage.navigateTo('/answers');
  
    //   let answerTextInput = answerpage.getAnswerTextInput();
    //   answerTextInput.sendKeys('It is in Florida');
  
    //   expect(answerTextInput.getAttribute('value')).toEqual('It is in Florida');

    //   let postAnswerBtn = answerpage.getPostAnswerBtn().click;
    // });



});
