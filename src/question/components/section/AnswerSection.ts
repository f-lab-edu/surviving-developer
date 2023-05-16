import { MainSection } from './MainSection.ts';

type AnswerModalProps = {
  answer: string;
};

export default class AnswerModal extends MainSection<AnswerModalProps> {
  constructor(props: AnswerModalProps) {
    super(props);
    this.createElement('answer_modal');
  }

  protected createElement(className: string) {
    const { answer } = this.props;
    this.$element.className = className;
    this.$element.innerHTML = `
      <div class="answer_text">${answer}</div>
    `;
  }
}
