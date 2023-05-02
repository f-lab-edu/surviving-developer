/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
 */
import questionViewTemplate from './questionViewTemplate';
import ContentModal from './components/ContentModal';
import AnswerModal from './components/AnswerModal';
import EmptyQuestion from './components/EmptyQuestion';
import View from '../core/View';

export default class QuestionView extends View {
  title = null;
  answer = null;

  constructor() {
    super(document.querySelector('main'));
  }

  addEvent(handlers) {
    this.$newEl.addEventListener('click', this.#runClickEvents(handlers));
    this.$newEl.addEventListener('input', this.#runInputEvents(handlers));
    document.addEventListener('keyup', this.#runKeyupEvents(handlers));
  }

  #runClickEvents({
    handleChangeQuestion,
    handleShowAnswer,
    handleResetQuestion,
    handleAddAnswer,
  }) {
    return ({ target }) => {
      if (target.classList.contains('next_button')) {
        handleChangeQuestion('next');
      }
      if (target.classList.contains('prev_button')) {
        handleChangeQuestion('prev');
      }
      if (target.classList.contains('open_answer_button')) {
        handleShowAnswer(true);
      }
      if (target.classList.contains('reset_question_button')) {
        handleResetQuestion();
        super.hide(['.empty_question']);
        super.show(['.content_modal', '.answer_modal', '.question_changer']);
      }
      if (target.classList.contains('submit_button')) {
        const textarea = this.$newEl.querySelector('.answer_textarea');
        const id = this.$router.params.id;
        const result = handleAddAnswer(id, textarea.value);
        if (result) {
          alert('저장 완료!');
        }
      }
    };
  }

  #runInputEvents({ handleChangeTextarea }) {
    return ({ target }) => {
      if (target.classList.contains('answer_textarea')) {
        handleChangeTextarea(target.value);
      }
    };
  }

  #runKeyupEvents({ handleChangeQuestion }) {
    return ({ target, key }) => {
      if (target.classList.contains('answer_textarea')) {
        return;
      }
      if (key === 'ArrowRight') {
        handleChangeQuestion('next');
      }
      if (key === 'ArrowLeft') {
        handleChangeQuestion('next');
      }
    };
  }

  submitDisabled(isApplySubmit) {
    const submit = this.$newEl.querySelector('.submit_button');
    submit.disabled = !isApplySubmit;
  }

  displayTitle(title) {
    if (this.title !== title) {
      super.addComponent(
        '.content_modal',
        new ContentModal({ title }).component,
      );
    }
    this.title = title;
  }
  displayAnswer(answer) {
    if (this.answer !== answer) {
      super.addComponent(
        '.answer_modal',
        new AnswerModal({ answer }).component,
      );
    }
    this.answer = answer;
  }
  displayEmpty() {
    super.addComponent('.empty_question', new EmptyQuestion().component);
    super.hide(['.content_modal', '.answer_modal', '.question_changer']);
  }

  toggleAnswerModal({ currentQuestion, isShowAnswer }) {
    if (isShowAnswer) {
      this.displayAnswer(currentQuestion.answer);
      const answerModal = this.$newEl.querySelector('.answer_modal');

      setTimeout(() => {
        answerModal.classList.add('is--show');
      });
    } else {
      const answerModal = this.$newEl.querySelector('.answer_modal');
      answerModal.classList.remove('is--show');

      setTimeout(() => {
        this.displayAnswer('');
      }, 500);
    }
  }

  getTemplate() {
    return questionViewTemplate();
  }
}
