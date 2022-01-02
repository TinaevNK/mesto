export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    };
    return userInfo;
  }

  setUserInfo(inputs) {
    this._profileName.textContent = inputs.name;
    this._profileJob.textContent = inputs.job;
  }
}
