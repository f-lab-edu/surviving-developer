import { bindingMethods } from '../utils/eventUtils.ts';
import Controller from '../core/Controller.ts';
import { isEmpty } from '../utils/objectUtils.ts';
import { randomString } from '../utils/stringUtils.ts';
import ManageModel from './ManageModel.ts';
import ManageView from './ManageView.ts';
import { Question } from '../common/IndexedDB.ts';
import { QUESTION_TYPE, CATEGORY_TYPE } from '../utils/constants.ts';

type UserRegisterAnswer = Pick<Question, 'answer' | 'category' | 'title'>;

export default class ManageController extends Controller {
  isAllPage = true;
  model: ManageModel;
  view: ManageView;

  constructor(model: ManageModel, view: ManageView) {
    super(model, view);
    this.model = model;
    this.view = view;
  }

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
      type: QUESTION_TYPE.USER,
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

  handleChangeCategory(value: CATEGORY_TYPE) {
    this.model.changeCategory(value);
    this.view.displaySection(this.isAllPage, this.model);
  }

  handleClickAnswer(id: string) {
    const question = this.model.getQuestionById(id);
    const event = new CustomEvent('@openModal', {
      detail: {
        modalName: 'userAnserModal',
        props: {
          answerList: question?.answerList,
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
