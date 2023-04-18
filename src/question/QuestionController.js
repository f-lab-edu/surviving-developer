/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */
import { isEmpty } from '../utils/objectUtils';
import { bindingMethods } from '../utils/eventUtils';
import Controller from '../core/Controller';

export default class QuestionController extends Controller {
  async init() {
    await this.model.init();
    this.model.suffleList();
    this.#setUrlByParams();
    this.render();
    // view, model 바인딩 하나로 묶기
    bindingMethods(this, 'handle');
  }

  #setUrlByParams() {
    const { params } = this.$router;
    const id = isEmpty(params) ? this.model.firstId : params.id;

    this.model.setCurrentId(id);
    if (this.model.currentQuestion) {
      this.$router.replace({ path: `/question/${id}` });
    }
  }

  #changeRouter(id) {
    this.$router.replace({ path: `/question/${id}` });
  }

  handleChangeQuestion(direction) {
    this.model.changeQuestion(direction);
    this.model.setShowAnswer(false);

    this.view.toggleAnswerModal(this.model);
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
    this.model.setShowAnswer(isShowAnswer);
    const { isApplySubmit } = this.model;
    this.view.submitDisabled(isApplySubmit);
    this.view.toggleAnswerModal(this.model);
    this.render();
  }

  handleResetQuestion() {
    this.model.resetCurrentId();
    this.render();
  }

  handleAddAnswer(id, value) {
    const result = this.model.addAnswer(id, value);
    if (result) {
      this.handleChangeQuestion('next');
    }
    return result;
  }

  render() {
    if (!this.model.currentQuestion) {
      this.view.displayEmpty();
      return;
    }
    const { title } = this.model.currentQuestion;
    this.view.displayTitle(title);
  }
}
