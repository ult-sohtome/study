export class UserNameRepository {
  constructor(){
    this.USER_NAME_KEY = Object.freeze("userName");
  }

  setUserName(userName){
    sessionStorage.setItem(this.USER_NAME_KEY, userName);
  }

  getUserName(){
    return sessionStorage.getItem(this.USER_NAME_KEY);
  }

  hasUserName(){
    return Object.keys(sessionStorage).some(key => key.startsWith(this.USER_NAME_KEY));
  }
}