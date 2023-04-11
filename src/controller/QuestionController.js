/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */

import { bindingMehtods } from '../utils/eventUtils';
import { randomString } from '../utils/stringUtils';

export default class QuestionController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    await this.model.setDB();

    this.model.suffleList();
    this.render();
    // view, model 바인딩 하나로 묶기
    bindingMehtods(this, 'handle');
  }

  handleChangeQuestion(direction) {
    this.model.changeQuestion(direction);

    this.model.changeShowAnswer(false);
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

  render() {
    const { title } = this.model.currentQuestion;
    this.view.displayTitle(title);
    this.view.toggleAnswerModal(this.model);
  }
}
