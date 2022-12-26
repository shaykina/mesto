export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
    this._avatar = document.querySelector(this._avatarSelector)
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent }
  }

  setUserInfo(formValues) {
    this._name.textContent = formValues.name;
    this._job.textContent = formValues.job;
  }

  setAvatar(formValues) {
    this._avatar.style.backgroundImage = `url(${formValues.avatar})`
  }
}
