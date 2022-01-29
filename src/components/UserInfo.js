export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent
    };
    return userInfo;
  }

  setUserInfo(inputs) {
    this._profileName.textContent = inputs.name;
    this._profileJob.textContent = inputs.about;
    this._profileAvatar.style.backgroundImage = `url(${inputs.avatar})`
  }
}
