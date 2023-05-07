/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
 */
import QuestionViewTemplate from './QuestionViewTemplate.ts';
import ContentModal from './components/ContentModal';
import AnswerModal from './components/AnswerModal';
import EmptyQuestion from './components/EmptyQuestion';
import View from '../core/View.ts';
import { Handler } from '../types/types.ts';
import QuestionController from './QuestionController.ts';
import { Question } from './types.ts';

export default class QuestionView extends View {
  private title = '';
  private answer = '';

  constructor() {
    const main = document.querySelector('main') as HTMLElement;
    super(main);
  }

  addEvent(handlers: Handler<QuestionController>): void {
    this.$newEl.addEventListener('click', this.runClickEvents(handlers));
    this.$newEl.addEventListener('input', this.runInputEvents(handlers));
    document.addEventListener('keyup', this.runKeyupEvents(handlers));
  }

  private runClickEvents({
    handleChangeQuestion,
    handleShowAnswer,
    handleResetQuestion,
    handleAddAnswer,
  }: Handler<QuestionController>): (event: MouseEvent) => void {
    // REVIEW: 아래와 같이 return 문을 사용했을 때 오버로드 관련 에러 발생. 이유를 모르겠음.
    // return ({target}: {target: HTMLElement}) => {
    return (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('next_button')) {
        // REVIEW: 메서드에 옵셔널 체이닝을 걸어 error를 없앴는데 맞는 방법인지?
        handleChangeQuestion?.('next');
      }
      if (target.classList.contains('prev_button')) {
        handleChangeQuestion?.('prev');
      }
      if (target.classList.contains('open_answer_button')) {
        handleShowAnswer?.(true);
      }
      if (target.classList.contains('reset_question_button')) {
        handleResetQuestion?.();
        super.hide(['.empty_question']);
        super.show(['.content_modal', '.answer_modal', '.question_changer']);
      }
      if (target.classList.contains('submit_button')) {
        const textarea = this.$newEl.querySelector(
          '.answer_textarea',
        ) as HTMLTextAreaElement;
        const id = this.$router.params.id;
        const result = handleAddAnswer?.(id, textarea.value);
        if (result) {
          alert('저장 완료!');
        }
      }
    };
  }

  private runInputEvents({
    handleChangeTextarea,
  }: // REVIEW: 왜 아래는 InputEvent 타입이 아니라, Event 타입으로 해야 error가 없어지나요?
  Handler<QuestionController>): (event: Event) => void {
    return (event) => {
      const target = event.target as HTMLTextAreaElement;

      if (target.classList.contains('answer_textarea')) {
        handleChangeTextarea?.(target.value);
      }
    };
  }

  private runKeyupEvents({
    handleChangeQuestion,
  }: Handler<QuestionController>): (event: KeyboardEvent) => void {
    return (event) => {
      const target = event.target as HTMLTextAreaElement;
      const key = event.key;

      if (target.classList.contains('answer_textarea')) {
        return;
      }
      if (key === 'ArrowRight') {
        handleChangeQuestion?.('next');
      }
      if (key === 'ArrowLeft') {
        handleChangeQuestion?.('next');
      }
    };
  }

  submitDisabled(isApplySubmit: boolean) {
    const submit = this.$newEl.querySelector(
      '.submit_button',
    ) as HTMLButtonElement;
    submit.disabled = !isApplySubmit;
  }

  displayTitle(title: string) {
    if (this.title !== title) {
      super.addComponent(
        '.content_modal',
        new ContentModal({ title }).component,
      );
    }
    this.title = title;
  }
  displayAnswer(answer: string) {
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

  toggleAnswerModal({
    currentQuestion,
    isShowAnswer,
  }: {
    currentQuestion: Question;
    isShowAnswer: boolean;
  }) {
    if (isShowAnswer) {
      this.displayAnswer(currentQuestion.answer);
      const answerModal = this.$newEl.querySelector('.answer_modal');

      setTimeout(() => {
        if (answerModal !== null) {
          answerModal.classList.add('is--show');
        }
      });
    } else {
      const answerModal = this.$newEl.querySelector('.answer_modal');
      if (answerModal !== null) {
        answerModal.classList.remove('is--show');
      }

      setTimeout(() => {
        this.displayAnswer('');
      }, 500);
    }
  }

  getTemplate() {
    return QuestionViewTemplate();
  }
}
