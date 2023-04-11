/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */

import { getHasPrefixList, randomString } from '../utils/stringUtils';

export default class QuestionController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    await this.model.setDB();

    this.model.suffleList();
    this.render();
    this.bindingThisMethods();
  }

  // view, model 바인딩 하나로 묶기
  bindingThisMethods() {
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const bindMethodNames = getHasPrefixList('bind', keys);
    const handlers = {};
    bindMethodNames.forEach(name => {
      handlers[name] = this[name].bind(this);
    });

    this.view.addEvent(handlers);
  }

  bindChangeQuestion(direction) {
    this.model.handleChangeQuestion(direction);

    this.model.handleChangeShowAnswer(false);
    this.render();
  }

  bindChangeTextarea(value) {
    this.model.handleChangeUserAnswer(value);
    const { isApplySubmit } = this.model;
    this.view.submitDisabled(isApplySubmit);
  }

  bindShowAnswer(isShowAnswer) {
    this.model.handleChangeShowAnswer(isShowAnswer);
    const { isApplySubmit } = this.model;
    this.view.submitDisabled(isApplySubmit);
    this.render();
  }

  bindAddQuestion(question) {
    question.id = randomString(8);
    this.model.handleAddQuestion(question);
  }

  render() {
    const { title, answer } = this.model.currentQuestion;
    this.view.displayTitle(title);
    if (this.model.isShowAnswer) {
      this.view.displayAnswer(answer);
    } else {
      setTimeout(() => {
        this.view.displayAnswer('');
      }, 500);
    }
    this.view.showAnswerModal(this.model.isShowAnswer);
  }
}
