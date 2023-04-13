export default class QuestionList {
  constructor(props) {
    this.props = props;
    this.$element = document.createElement('table');
    this.#createElement('question_table');
  }

  #createElement(className) {
    const { questionList, isAllPage } = this.props;

    this.$element.className = className;
    this.$element.innerHTML = `
      <thead>
        <tr>
          <th class="table_head pin">질문</th>
          <th class="table_head pin">카테고리</th>
          <th class="table_head pin">제출이력</th>
          <th class="table_head pin">${isAllPage ? '타입' : '삭제'}</th>
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
              <td class="table_body">
                ${
                  isAllPage
                    ? question.type
                    : `<button class="delete_button" data-id="${question.id}">삭제</button>`
                }
              </td>
              <td class="table_body">
                <a href="/question/${question.id}" data-route="/question/${
              question.id
            }">
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
