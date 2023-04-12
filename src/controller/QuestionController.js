/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */

import { bindingMehtods } from '../utils/eventUtils';
import { isEmpty } from '../utils/objectUtils';
import { randomString } from '../utils/stringUtils';

export default class QuestionController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    await this.model.setDB();
    this.model.suffleList();
    this.#setRouter();
    this.render();
    // view, model 바인딩 하나로 묶기
    bindingMehtods(this, 'handle');
  }

  #setRouter() {
    let id;
    const { params } = window.$router;
    if (isEmpty(params)) {
      id = this.model.firstId;
    } else {
      id = params.id;
    }

    this.model.setCurrentId(id);
    if (this.model.currentQuestion) {
      window.$router.replace({ path: `/question/${id}` });
    }
  }

  #changeRouter(id) {
    window.$router.replace({ path: `/question/${id}` });
  }

  handleChangeQuestion(direction) {
    this.model.changeQuestion(direction);
    this.model.changeShowAnswer(false);

    const questionId = this.model.currentQuestion.id;
    this.#changeRouter(questionId);
    this.render();
  }

  handleChangeTextarea(value) {
    this.model.changeUserAnswer(value);
    const { isApplySubmit } = this.model;
    this.view.submitDisabled(isApplySubmit);
  }

  handleShowAnswer(isShowAnswer) {
    this.model.changeShowAnswer(isShowAnswer);
    const { isApplySubmit } = this.model;
    this.view.submitDisabled(isApplySubmit);
    this.render();
  }

  handleAddQuestion(question) {
    question.id = randomString(8);
    this.model.addQuestion(question);
  }

  handleResetQuestion() {
    this.model.resetCurrentId();
    this.render();
  }

  render() {
    if (!this.model.currentQuestion) {
      this.view.displayEmpty();
      return;
    }
    const { title } = this.model.currentQuestion;
    this.view.displayTitle(title);
    this.view.toggleAnswerModal(this.model);
  }
}
