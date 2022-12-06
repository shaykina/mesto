import { profileName, profileJob } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    return { name: document.querySelector(this._nameSelector).textContent, job: document.querySelector(this._jobSelector).textContent }
  }

  setUserInfo(nameInput, jobInput) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }
}
