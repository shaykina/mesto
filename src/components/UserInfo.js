export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, job: this._job.textContent }
  }

  setUserInfo(formValues) {
    this._name.textContent = formValues.name;
    this._job.textContent = formValues.job;
  }
}
