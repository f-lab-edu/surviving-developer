/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
 */

const getTemplate = ({ content }) => `
  <div class="question_title">${content}</div>
`;

export default ({ element, targetClass, state }) => {
  console.log('interview content');
  const { currentQuestion } = state;
  const targetElement = element.querySelector(`.${targetClass}`);
  if (!targetElement) {
    throw new Error('target class is not define!');
  }
  targetElement.innerHTML = getTemplate(currentQuestion);
  return element;
};
