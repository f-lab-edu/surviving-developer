import Controller from './Controller';
import { isEmpty } from '../utils/objectUtils';
import { randomString } from '../utils/stringUtils';

export default class ManageController extends Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    await this.model.init();
    this.checkRoute();
    this.render();
  }

  handleAddQuestion(question) {
    question.id = randomString(8);
    this.model.addQuestion(question);
  }

  checkRoute() {
    const { params } = window.$router;
    const isAllPage = isEmpty(params);
    this.view.displaySection(isAllPage, this.model);
    this.view.displayActiveTap(isAllPage);
  }

  render() {}
}
