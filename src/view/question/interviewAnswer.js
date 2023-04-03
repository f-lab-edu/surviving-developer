const getTemplate = ({ answer }) => `
  <div class="answer_text">${answer}</div>
`;

const animateShowModal = element => {
  let height = 0;
  const autoHeight = () => {
    // padding: 4rem 6rem;
    element.style.padding = `${height}rem 6rem`;
    height += 1;
    if (height <= 4) {
      window.requestAnimationFrame(autoHeight);
    }
  };
  window.requestAnimationFrame(autoHeight);
};

export default function interviewAnswerView({ element, targetClass, state }) {
  const { currentQuestion } = state;
  const targetElement = element.querySelector(`.${targetClass}`);
  if (!targetElement) {
    throw new Error('target class is not define!');
  }
  targetElement.innerHTML = getTemplate(currentQuestion);
  return { element, animateShowModal };
}
