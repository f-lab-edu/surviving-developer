export default class QuestionList {
  constructor(props) {
    this.props = props;
    this.$element = document.createElement('select');
    this.#createElement();
  }

  #createElement() {
    const { categoryList, defaultOption, className } = this.props;

    this.$element.className = className;
    this.$element.innerHTML = `
      ${!defaultOption ? `<option value="all" selected>전체</option>` : ''}
      ${categoryList.map(
        category => `<option value="${category}">${category}</option>`,
      )}
    `;
  }

  get component() {
    return this.$element;
  }
}
