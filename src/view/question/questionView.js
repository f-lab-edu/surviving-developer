// import applyDiff from '../../applyDiff';
import getTemplate from './questionViewTemplate';
import ContentModal from './components/ContentModal';
import AnswerModal from './components/AnswerModal';

export default class QuestionView {
  state;
  constructor() {
    this.$app = document.querySelector('#app');
    this.$newEl = this.$app.cloneNode(true);
    this.render();
  }

  #addComponent(className, component) {
    this.$newEl.querySelector(className).replaceWith(component);
  }

  bindChangeTextarea(handler) {
    this.$newEl
      .querySelector('.answer_textarea')
      .addEventListener('input', ({ target }) => {
        handler(target.value);
      });
  }
  bindChangeQuestion(handler) {
    ['next', 'prev'].forEach(name => {
      this.$newEl
        .querySelector(`.${name}_button`)
        .addEventListener('click', () => {
          handler(name);
        });
    });
  }

  onChnageProps(state) {
    this.state = state;
    this.render();
  }

  render() {
    this.$newEl.innerHTML = getTemplate;

    this.#addComponent(
      '.content_modal',
      new ContentModal({ content: 'smaple content' }).component,
    );
    this.#addComponent(
      '.answer_modal',
      new AnswerModal({ answer: 'abd' }).component,
    );

    this.$app.appendChild(this.$newEl);
    // applyDiff(document.body, this.$app, this.$newEl);
  }
}

/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
//  */
// import questionContentView from './components/ContentModal';
// import questionAnswerView from './components/AnswerModal';

// import { debounce } from '../../utils/eventUtils';

// const addEvent = (rootElement, eventType, eventFunc, bubble = true) => {
//   rootElement.addEventListener(eventType, event => eventFunc(event), bubble);
// };

// const view = ($app, state, events) => {
//   const newElement = $app.cloneNode(true);
//   newElement.innerHTML = getTemplate();

//   // Element 교체 View 함수
//   questionContentView({
//     element: newElement,
//     targetClass: 'interview_content',
//     state,
//   });
//   const { animateShowModal } = questionAnswerView({
//     element: newElement,
//     targetClass: 'interview_answer',
//     state,
//   });

//   // Event 등록
//   const toggleSubmitDisabled = isApplySubmit => {
//     const submit = document.querySelector('.submit');
//     submit.disabled = !isApplySubmit;
//   };

//   newElement.querySelector('.prev_button').addEventListener('click', () => {});

//   addEvent(
//     newElement.querySelector('.app_container'),
//     'click',
//     ({ target }) => {
//       if (target.classList.contains('prev_button')) {
//         events.showAnswer(false);
//         events.moveQuestion('prev');
//       }
//       if (target.classList.contains('next_button')) {
//         events.showAnswer(false);
//         events.moveQuestion('next');
//       }
//       if (target.classList.contains('view_answer')) {
//         events.showAnswer(true);
//         toggleSubmitDisabled(state.isApplySubmit);

//         const answerModal = document.querySelector('.answer_modal');
//         if (!answerModal.classList.contains('is--show')) {
//           answerModal.classList.add('is--show');
//           animateShowModal(answerModal);
//         }
//       }
//     },
//   );

//   addEvent(
//     newElement.querySelector('.answer_section'),
//     'input',
//     ({ target }) => {
//       if (target.classList.contains('answer_section')) {
//         events.inputTextarea(target.value);
//         toggleSubmitDisabled(state.isApplySubmit);
//       }
//     },
//   );

//   // TODO: event가 갈수록 여러번 일어남.
//   addEvent(
//     document,
//     'keyup',
//     debounce(({ key }) => {
//       events.showAnswer(false);
//       if (key === 'ArrowLeft') {
//         events.moveQuestion('prev');
//       }
//       if (key === 'ArrowRight') {
//         events.moveQuestion('next');
//       }
//     }, 300),
//     false,
//   );

//   return newElement;
// };

// export default view;
