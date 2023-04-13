import BuiltInQuestionList from './components/QuestionList';
import manageTemplate from './ManageViewTemplate';
import View from '../common/View';

export default class QuestionView extends View {
  constructor() {
    super(document.querySelector('main'));
  }

  addEvent(handlers) {
    this.$newEl.addEventListener('click', this.runDomEvents(handlers), true);
  }

  runDomEvents() {
    return () => {};
  }

  displaySection(isAllPage, model) {
    let questionList = model.builtInQuestions;
    if (!isAllPage) {
      questionList = model.userQuestions;
    }
    super.addComponent(
      '.question_table',
      new BuiltInQuestionList(questionList).component,
    );
  }

  displayActiveTap(isAllPage) {
    const allView = this.$newEl.querySelector('.all_view');
    const myView = this.$newEl.querySelector('.my_view');

    if (isAllPage) {
      allView.classList.add('active');
      myView.classList.remove('active');
    } else {
      allView.classList.remove('active');
      myView.classList.add('active');
    }
  }

  getTemplate() {
    return manageTemplate();
  }
}
