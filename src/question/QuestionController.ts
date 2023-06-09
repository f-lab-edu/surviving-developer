/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */
import { isEmpty } from '../utils/objectUtils.ts';
import { bindingMethods } from '../utils/eventUtils.ts';
import Controller from '../core/Controller.ts';
import QuestionModel from './QuestionModel.ts';
import QuestionView from './QuestionView.ts';
import { NavigationButton } from './types.ts';

export default class QuestionController extends Controller {
  model: QuestionModel;
  view: QuestionView;

  constructor(model: QuestionModel, view: QuestionView) {
    super(model, view);
    this.model = model;
    this.view = view;
  }

  async init() {
    await this.model.init();
    this.model.suffleList();
    this.setUrlByParams();
    this.render();
    // view, model 바인딩 하나로 묶기
    bindingMethods(this, 'handle');
  }

  private setUrlByParams() {
    const { params } = this.$router;
    const id = isEmpty(params) ? this.model.firstId : params.id;

    this.model.setCurrentId(id);
    if (this.model.currentQuestion) {
      this.$router.replace(`/question/${id}`);
    }
  }

  private changeRouter(id: string) {
    this.$router.replace(`/question/${id}`);
  }

  handleChangeQuestion(direction: NavigationButton) {
    this.model.changeQuestion(direction);
    this.model.setShowsAnswer(false);

    const { currentQuestion } = this.model;
    if (currentQuestion) {
      this.view.toggleAnswerModal({ showsAnswer: false, currentQuestion });
    }

    if (this.model.currentQuestion) {
      const questionId = this.model.currentQuestion.id;
      this.changeRouter(questionId);
    }

    this.render();
  }

  handleChangeTextarea(value: string) {
    this.model.changeUserAnswer(value);
    const { canSubmit } = this.model;
    this.view.submitDisabled(canSubmit);
  }

  handleShowsAnswer(showsAnswer: boolean) {
    this.model.setShowsAnswer(showsAnswer);
    const { canSubmit } = this.model;
    this.view.submitDisabled(canSubmit);

    const { currentQuestion } = this.model;
    if (currentQuestion) {
      this.view.toggleAnswerModal({ showsAnswer, currentQuestion });
    }
    this.render();
  }

  handleResetQuestion() {
    this.model.resetCurrentId();
    this.render();
  }

  async handleAddAnswer(id: string, value: string) {
    const result = await this.model.addAnswer(id, value);
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
