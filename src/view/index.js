// import mainPageTemplate from '../page/mainPage';
import interviewContent from './interviewContent';
import interviewAnswer from './interviewAnswer';

const addEvent = (rootElement, eventType, eventFunc) => {
  console.log('add');
  rootElement.addEventListener(eventType, event => eventFunc(event));
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
            <textarea placeholder="답변을 적으세요" spellcheck="false" maxlength="1000"></textarea>
          </div>
          <div class="button_wrapper">
            <button>정답 보기</button>
            <button>제출 하기</button>
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

  interviewContent({
    element: newElement,
    targetClass: 'interview_content',
    state,
  });
  interviewAnswer({
    element: newElement,
    targetClass: 'interview_answer',
    state,
  });

  addEvent(newElement, 'click', ({ target }) => {
    if (target.classList.contains('prev_button')) {
      events.moveQuestion('prev');
    }
    if (target.classList.contains('next_button')) {
      events.moveQuestion('next');
    }
  });

  return newElement;
};

export default view;
