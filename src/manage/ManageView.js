/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
 */
import manageTemplate from './ManageViewTemplate';
import View from '../common/View';

export default class QuestionView extends View {
  title = null;
  answer = null;

  constructor() {
    super(document.querySelector('main'));
  }

  addEvent(handlers) {
    this.$newEl.addEventListener('click', this.runDomEvents(handlers), true);
  }

  runDomEvents() {
    return () => {};
  }

  getTemplate() {
    return manageTemplate();
  }
}
