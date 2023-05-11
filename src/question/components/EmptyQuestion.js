export default class ContentModal {
  constructor() {
    this.$element = document.createElement('div');
    this.#createElement('empty_question');
  }

  #createElement(className) {
    this.$element.className = className;
    this.$element.innerHTML = `
      ID에 맞는 질문이 없습니다 🥲
      <button class="reset_question_button">새로운 질문 받기</button>
    `;
  }

  get component() {
    return this.$element;
  }
}
