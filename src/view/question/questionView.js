/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
 */
import questionViewContent from './questionViewContent';
import questionViewAnswer from './questionViewAnswer';
import { debounce } from '../../utils';

const addEvent = (rootElement, eventType, eventFunc, bubble = true) => {
  rootElement.addEventListener(eventType, event => eventFunc(event), bubble);
};

const view = ($app, state, events) => {
  const newElement = $app.cloneNode(true);
  // TODO: router view
  newElement.innerHTML = `
    <div class="app_container">
      <div class="move_round">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <aside class="question_changer">
        <button class="prev_button"><</button>
        <button class="next_button">></button>
      </aside>
      <main>
        <div class="content_modal">
          <div class="interview_content">
            test question
          </div>
          <div class="textarea_wrapper">
            <textarea 
              class="answer_section"
              placeholder="답변을 적으세요"
              spellcheck="false"
              maxlength="1000"
            ></textarea>
          </div>
          <div class="button_wrapper">
            <button class="view_answer">정답 보기</button>
            <button class="submit" disabled>제출 하기</button>
          </div>
        </div>
        <div class="answer_modal">
          <div class="interview_answer">
            test answer
          </div>
        </div>
      </main>
    </div>
  `;

  // Element 교체 View 함수
  questionViewContent({
    element: newElement,
    targetClass: 'interview_content',
    state,
  });
  const { animateShowModal } = questionViewAnswer({
    element: newElement,
    targetClass: 'interview_answer',
    state,
  });

  // Event 등록
  const toggleSubmitDisabled = isApplySubmit => {
    const submit = document.querySelector('.submit');
    submit.disabled = !isApplySubmit;
  };

  addEvent(
    newElement.querySelector('.app_container'),
    'click',
    ({ target }) => {
      if (target.classList.contains('prev_button')) {
        events.showAnswer(false);
        events.moveQuestion('prev');
      }
      if (target.classList.contains('next_button')) {
        events.showAnswer(false);
        events.moveQuestion('next');
      }
      if (target.classList.contains('view_answer')) {
        events.showAnswer(true);
        toggleSubmitDisabled(state.isApplySubmit);

        const answerModal = document.querySelector('.answer_modal');
        if (!answerModal.classList.contains('is--show')) {
          answerModal.classList.add('is--show');
          animateShowModal(answerModal);
        }
      }
    },
  );

  addEvent(
    newElement.querySelector('.answer_section'),
    'input',
    ({ target }) => {
      if (target.classList.contains('answer_section')) {
        events.inputTextarea(target.value);
        toggleSubmitDisabled(state.isApplySubmit);
      }
    },
  );

  // TODO: event가 갈수록 여러번 일어남.
  addEvent(
    document,
    'keyup',
    debounce(({ key }) => {
      events.showAnswer(false);
      if (key === 'ArrowLeft') {
        events.moveQuestion('prev');
      }
      if (key === 'ArrowRight') {
        events.moveQuestion('next');
      }
    }, 300),
    false,
  );

  return newElement;
};

export default view;
