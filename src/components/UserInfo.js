import { profileName, profileJob } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    this._name = document.querySelector(this._nameSelector).textContent;
    this._job = document.querySelector(this._jobSelector).textContent;
    return { name: this._name, job: this._job }
  }

  setUserInfo(formValues) {
    profileName.textContent = formValues.name;
    profileJob.textContent = formValues.job;
  }
}
