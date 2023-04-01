/**
 * Controller
 * 1. view로 부터 event 발생을 전달 받음.
 * 2. state를 가공시킬 수 있는 메서드를 호출
 *  -> eventListener의 callback이 여기서 정의가 되어야 함.
 * 3. 최종 render
 */

import { state, dispatchs } from './core/model';
import view from './view';
import applyDiff from './applyDiff';

let render = () => {};

// event 정의
const events = {
  moveQuestion: direction => {
    dispatchs.changeQuestion(direction);
    console.log('move');
    render();
  },
  answerQuestion: () => {
    render();
  },
  openAnswer: () => {
    render();
  },
};

render = () => {
  console.log('render');
  window.requestAnimationFrame(() => {
    const $app = document.querySelector('#app');
    console.log($app);

    const newNode = view($app, state, events);
    console.log(newNode);
    applyDiff(document.body, $app, newNode);
    // $app.replaceWith(newNode);
  });
};

// init
export default function app() {
  dispatchs.shuffleList();
  render();
}
