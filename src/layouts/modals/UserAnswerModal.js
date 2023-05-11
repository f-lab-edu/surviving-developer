import Modal from './Modal';

export default class UserAnswerModal extends Modal {
  createElement(className) {
    const { answerList } = this.props;

    this.$element.className = className;
    this.$element.innerHTML = `
      <div class="answer_modal_container">
        <ul>
          ${answerList
            .map(
              (answer, index) =>
                `
              <li>
                <span class="answer_count">답변${index + 1}</span>
                <span class="answer">${answer}</span>
              </li>
            `,
            )
            .join('')}
        </ul>
      </div>
    `;
  }

  get component() {
    return this.$element;
  }
}
