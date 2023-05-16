type AnswerModalProps = {
  answer: string;
};

export default class AnswerModal {
  private props: AnswerModalProps;
  $element: HTMLDivElement;

  constructor(props: AnswerModalProps) {
    this.props = props;
    this.$element = document.createElement('div');
    this.createElement('answer_modal');
  }

  private createElement(className: string) {
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
