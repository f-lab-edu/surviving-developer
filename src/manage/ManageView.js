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

  displayBuiltInSection(questionList) {
    super.addComponent(
      '.question_table',
      new BuiltInQuestionList(questionList).component,
    );
  }

  getTemplate() {
    return manageTemplate();
  }
}
