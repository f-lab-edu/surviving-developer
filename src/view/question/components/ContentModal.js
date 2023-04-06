export default class ContentModal {
  constructor(props) {
    this.props = props;
    this.$element = document.createElement('div');
    this.#createElement('content_modal');
  }

  #createElement(className) {
    const { content } = this.props;
    this.$element.className = className;

    this.$element.innerHTML = `
      <div class="question_title">${content}</div>
      <div class="textarea_wrapper">
        <textarea 
          class="answer_textarea"
          placeholder="답변을 적으세요"
          spellcheck="false"
          maxlength="1000"
        ></textarea>
      </div>
      <div class="button_wrapper">
        <button class="open_answer_button">정답 보기</button>
        <button class="submit_button" disabled>제출 하기</button>
      </div>
    `;
  }

  get component() {
    return this.$element;
  }
}
