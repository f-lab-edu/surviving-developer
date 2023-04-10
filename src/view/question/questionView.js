/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
 */
import getTemplate from './questionViewTemplate';
import ContentModal from './components/ContentModal';
import AnswerModal from './components/AnswerModal';

export default class QuestionView {
  title = null;
  answer = null;
  constructor() {
    this.$app = document.querySelector('#app');
    this.$newEl = this.$app.cloneNode(true);
    this.init();
  }

  #addComponent(className, component) {
    this.$newEl.querySelector(className).replaceWith(component);
  }

  addEvent(handlers) {
    this.$newEl.addEventListener('click', this.runDomEvents(handlers), true);
    this.$newEl.addEventListener('input', this.runDomEvents(handlers), true);
    document.addEventListener('keyup', ({ target, key }) => {
      if (target.classList.contains('answer_textarea')) {
        return;
      }
      if (key === 'ArrowRight') {
        handlers.bindChangeQuestion('next');
      }
      if (key === 'ArrowLeft') {
        handlers.bindChangeQuestion('next');
      }
    });
  }

  runDomEvents({
    bindChangeTextarea,
    bindChangeQuestion,
    bindShowAnswer,
    bindAddQuestion,
  }) {
    return ({ target }) => {
      if (target.classList.contains('next_button')) {
        bindChangeQuestion('next');
      }
      if (target.classList.contains('prev_button')) {
        bindChangeQuestion('prev');
      }
      if (target.classList.contains('open_answer_button')) {
        bindShowAnswer(true);
      }
      if (target.classList.contains('answer_textarea')) {
        bindChangeTextarea(target.value);
      }
      if (target.classList.contains('add-one')) {
        bindAddQuestion({
          title: 'test',
          answer: 'test',
          submitcount: 0,
          category: 'test',
        });
      }
    };
  }

  submitDisabled(isApplySubmit) {
    const submit = this.$newEl.querySelector('.submit_button');
    submit.disabled = !isApplySubmit;
  }

  displayTitle(title) {
    if (this.title !== title) {
      this.#addComponent(
        '.content_modal',
        new ContentModal({ title }).component,
      );
    }
    this.title = title;
  }
  displayAnswer(answer) {
    if (this.answer !== answer) {
      this.#addComponent(
        '.answer_modal',
        new AnswerModal({ answer }).component,
      );
    }
    this.answer = answer;
  }

  showAnswerModal(isShow) {
    setTimeout(() => {
      const answerModal = this.$newEl.querySelector('.answer_modal');
      if (isShow) {
        answerModal.classList.add('is--show');
        return;
      }
      answerModal.classList.remove('is--show');
    });
  }

  init() {
    this.$newEl.innerHTML = getTemplate;
    this.$app.replaceWith(this.$newEl);
  }
}
