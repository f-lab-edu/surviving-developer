export default class BuiltInQuestionList {
  constructor(props) {
    this.props = props;
    this.$element = document.createElement('table');
    this.#createElement('question_table');
  }

  #createElement(className) {
    const questionList = this.props;
    this.$element.className = className;
    this.$element.innerHTML = `
      <thead>
        <tr>
          <th class="table_head pin">질문</th>
          <th class="table_head pin">카테고리</th>
          <th class="table_head pin">제출이력</th>
          <th class="table_head pin">타입</th>
          <th class="table_head pin">이동</th>
        </tr>
      </thead>
      <tbody>
        ${questionList
          .map(
            question => `
            <tr>
              <td class="table_body">${question.title}</td>
              <td class="table_body">${question.category}</td>
              <td class="table_body">${question.submitCount}</td>
              <td class="table_body">${question.type}</td>
              <td class="table_body">
                <a href="/question/${question.id}" data-route="/question/${question.id}">
                  ${question.id}
                </a>
              </td>
            </tr>
          `,
          )
          .join('')}
      </tbody>
    `;
  }

  get component() {
    return this.$element;
  }
}
