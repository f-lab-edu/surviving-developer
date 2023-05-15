import { bindingMethods } from '../utils/eventUtils';
import Controller from '../core/Controller';
import { isEmpty } from '../utils/objectUtils';
import { randomString } from '../utils/stringUtils';
import { Question } from '../question/types.ts';

type UserRegisterAnswer = Pick<Question, 'answer' | 'category' | 'title'>;

export default class ManageController extends Controller {
  isAllPage: boolean = true;

  async init() {
    await this.model.init();
    this.checkRoute();
    this.view.displaySelect(this.model.categoryList);
    this.render();
    bindingMethods(this, 'handle');
  }

  handleAddQuestion(question: UserRegisterAnswer) {
    this.model.addQuestion({
      ...question,
      id: randomString(8),
      answerList: [],
      type: 'user',
    });
    this.render();
  }

  handleChangeInput(value: string) {
    this.model.changeTitle(value);
    this.view.toggleSubmitButtonDisabled(this.model.isApplySubmit);
  }

  handleChangeTextarea(value: string) {
    this.model.changeAnswer(value);
    this.view.toggleSubmitButtonDisabled(this.model.isApplySubmit);
  }

  handleDeleteQuestion(id: string) {
    this.model.deleteQuestion(id);
    this.render();
  }

  handleChangeCategory(value: string) {
    this.model.changeCategory(value);
    this.view.displaySection(this.isAllPage, this.model);
  }

  handleClickAnswer(id: string) {
    const question = this.model.getQuestionById(id);
    const event = new CustomEvent('@openModal', {
      detail: {
        modalName: 'userAnserModal',
        props: {
          answerList: question.answerList,
        },
      },
    });
    const $app = document.querySelector('#app') as HTMLDivElement;
    $app.dispatchEvent(event);
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
