import { Question } from '../../question/types.ts';
import { isEmpty } from '../../utils/objectUtils';

type QuestionManageListProps = {
  questionList: Question[];
  isAllPage: boolean;
};

export default class QuestionList {
  props: QuestionManageListProps;
  $element: HTMLTableElement;

  constructor(props: QuestionManageListProps) {
    this.props = props;
    this.$element = document.createElement('table');
    this.createElement('question_table');
  }

  private createElement(className: string) {
    const { questionList, isAllPage } = this.props as QuestionManageListProps;

    this.$element.className = className;
    this.$element.innerHTML = `
    ${
      isEmpty(questionList)
        ? `<div class="nothing_item">자신만의 질문을 만들어보세요! 🙉</div>`
        : `
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
            (question) => `
            <tr>
              <td class="table_body">${question.title}</td>
              <td class="table_body">${question.category}</td>
              <td class="table_body">
                ${
                  question.answerList.length === 0
                    ? '0'
                    : `
                        <button 
                          class="show_answer_button" 
                          data-id="${question.id}"
                        >
                          ${question.answerList.length}
                        </button>
                      `
                }
              </td>
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
      </tbody>`
    }`;
  }

  get component() {
    return this.$element;
  }
}
