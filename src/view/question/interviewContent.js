const getTemplate = ({ content }) => `
  <div class="question_title">${content}</div>
`;

export default ({ element, targetClass, state }) => {
  const { currentQuestion } = state;
  const targetElement = element.querySelector(`.${targetClass}`);
  if (!targetElement) {
    throw new Error('target class is not define!');
  }
  targetElement.innerHTML = getTemplate(currentQuestion);
  return element;
};
