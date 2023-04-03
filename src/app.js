/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */

import { state, dispatchs } from './model/questionModel';
import questionView from './view/question';
import applyDiff from './applyDiff';

let render = () => {};

// event 정의
const events = {
  moveQuestion: direction => {
    dispatchs.changeQuestion(direction);
    render();
  },
  inputTextarea: value => {
    dispatchs.changeUserAnswer(value);
  },
  showAnswer: value => {
    dispatchs.changeShowAnswer(value);
  },
  // submitQuestion: () => {
  //   render();
  // },
  // openAnswer: () => {
  //   render();
  // },
};

render = () => {
  window.requestAnimationFrame(() => {
    const $app = document.querySelector('#app');
    const newNode = questionView($app, state, events);
    applyDiff(document.body, $app, newNode);
  });
};

// init
export default function app() {
  dispatchs.shuffleList();
  render();
}
