import { bindingMethods } from '../utils/eventUtils';
import Controller from '../common/Controller';
import { isEmpty } from '../utils/objectUtils';
import { randomString } from '../utils/stringUtils';

export default class ManageController extends Controller {
  async init() {
    await this.model.init();
    this.checkRoute();
    this.view.displaySelect(this.model.categoryList);
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

  handleChangeCategory(value) {
    this.model.changeCategory(value);
    this.view.displaySection(this.isAllPage, this.model);
  }

  handleClickAnswer(id) {
    const question = this.model.getQuestionById(id);
    const event = new CustomEvent('@openModal', {
      detail: {
        modalName: 'userAnserModal',
        props: {
          answerList: question.answerList,
        },
      },
    });
    document.querySelector('#app').dispatchEvent(event);
  }

  checkRoute() {
    const { params } = this.$router;
    this.isAllPage = isEmpty(params);
  }

  render() {
    this.view.displaySection(this.isAllPage, this.model);
    this.view.displayActiveTap(this.isAllPage);
  }
}
