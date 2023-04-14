import { bindingMethods } from '../utils/eventUtils';
import Controller from '../common/Controller';
import { isEmpty } from '../utils/objectUtils';
import { randomString } from '../utils/stringUtils';

export default class ManageController extends Controller {
  async init() {
    await this.model.init();
    this.checkRoute();
    this.render();
    bindingMethods(this, 'handle');
  }

  handleAddQuestion(question) {
    this.model.addQuestion({
      ...question,
      id: randomString(8),
      answerList: [],
      type: 'user',
    });
    this.render();
  }

  handleChangeInput(value) {
    this.model.changeTitle(value);
    this.view.submitDisabled(this.model.isApplySubmit);
  }

  handleChangeTextarea(value) {
    this.model.changeAnswer(value);
    this.view.submitDisabled(this.model.isApplySubmit);
  }

  handleDeleteQuestion(id) {
    this.model.deleteQuestion(id);
    this.render();
  }

  checkRoute() {
    const { params } = window.$router;
    this.isAllPage = isEmpty(params);
  }

  render() {
    this.view.displaySection(this.isAllPage, this.model);
    this.view.displayActiveTap(this.isAllPage);
  }
}
