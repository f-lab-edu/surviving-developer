const getTemplate = ({ currentId, questionList }) => `
  <div class="interview_question">${questionList[currentId].question}</div>
`;

export default ({ element, targetClass, state }) => {
  const targetElement = element.querySelector(`.${targetClass}`);
  if (!targetElement) {
    throw new Error('target class is not define!');
  }

  targetElement.innerHTML = getTemplate(state);
  return element;
};
