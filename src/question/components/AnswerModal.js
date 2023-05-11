export default class AnswerModal {
  constructor(props) {
    this.props = props;
    this.$element = document.createElement('div');
    this.#createElement('answer_modal');
  }

  #createElement(className) {
    const { answer } = this.props;
    this.$element.className = className;
    this.$element.innerHTML = `
      <div class="answer_text">${answer}</div>
    `;
  }

  get component() {
    return this.$element;
  }
}
