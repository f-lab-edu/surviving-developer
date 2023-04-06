/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */
// import questionView from '../view/question/questionView';
// import applyDiff from '../applyDiff';

export default class QuestionController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();

    // view, model 바인딩
    this.view.bindChangeTextarea(this.inputTextarea.bind(this));
    this.view.bindChangeQuestion(this.moveQuestion.bind(this));
  }

  moveQuestion(direction) {
    this.model.handleChangeQuestion(direction);
  }

  submitDisabled = () => {
    const submit = document.querySelector('.submit_button');
    submit.disabled = !this.model.isApplySubmit;
  };

  inputTextarea(value) {
    this.model.handleChangeUserAnswer(value);
    this.submitDisabled();
  }
  showAnswer(value) {
    this.model.handleChangeShowAnswer(value);
  }

  init() {
    this.model.suffleList();
  }
}
