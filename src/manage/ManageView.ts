import QuestionManageList from './components/QuestionManageList.ts';
import CategorySelect from './components/CategorySelect.ts';
import manageTemplate from './ManageViewTemplate.ts';
import View from '../core/View';
import { CATEGORY_TYPE } from '../utils/constants.ts';
import { Handler } from '../types/types.ts';
import ManageController from './ManageController.ts';
import { Question } from '../question/types.ts';
import ManageModel from './ManageModel.ts';

export default class ManageView extends View {
  constructor() {
    const main = document.querySelector('main') as HTMLElement;
    super(main);
  }

  addEvent(handlers: Handler<ManageController>) {
    this.$newEl.addEventListener('click', this.runClickEvents(handlers));
    this.$newEl.addEventListener('input', this.runInputEvents(handlers));
    this.$newEl.addEventListener('change', this.runChangeEvents(handlers));
  }

  private runInputEvents({
    handleChangeInput,
    handleChangeTextarea,
  }: Handler<ManageController>) {
    return (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target.classList.contains('title_input')) {
        handleChangeInput(target.value);
      }
      if (target.classList.contains('answer_textarea')) {
        handleChangeTextarea(target.value);
      }
    };
  }

  private runClickEvents({
    handleAddQuestion,
    handleDeleteQuestion,
    handleClickAnswer,
  }: Handler<ManageController>) {
    return (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      if (target.classList.contains('save_button')) {
        const select = this.$newEl.querySelector(
          '.category_select_regist',
        ) as HTMLSelectElement;
        const input = this.$newEl.querySelector('input') as HTMLInputElement;
        const textarea = this.$newEl.querySelector(
          'textarea',
        ) as HTMLTextAreaElement;

        handleAddQuestion({
          category: select.value as Question['category'],
          title: input.value,
          answer: textarea.value,
        });

        select.value = CATEGORY_TYPE.JAVASCRIPT;
        input.value = '';
        textarea.value = '';
        alert('등록 되었습니다!');

        this.toggleSubmitButtonDisabled(false);
      }
      if (target.classList.contains('delete_button')) {
        if (!window.confirm('삭제 할까요?')) {
          return;
        }
        handleDeleteQuestion(target.dataset.id || '');
      }
      if (target.classList.contains('show_answer_button')) {
        handleClickAnswer(target.dataset.id || '');
      }
    };
  }

  // TODO 카테고리 변경
  runChangeEvents({ handleChangeCategory }: Handler<ManageController>) {
    return (event: Event) => {
      const target = event.target as HTMLSelectElement;
      if (target.classList.contains('category_select_main')) {
        handleChangeCategory(target.value);
      }
    };
  }

  toggleSubmitButtonDisabled(isApplySubmit: boolean) {
    const submit = this.$newEl.querySelector(
      '.save_button',
    ) as HTMLButtonElement;
    submit.disabled = !isApplySubmit;
  }

  displaySection(isAllPage: boolean, model: ManageModel) {
    let questionList = model.displayQuestionList;
    if (!isAllPage) {
      questionList = model.userQuestions;
    }
    super.addComponent(
      '.question_table',
      new QuestionManageList({ questionList, isAllPage }).component,
    );
  }

  displaySelect(categoryList: CATEGORY_TYPE) {
    super.addComponent(
      '.category_select_main',
      new CategorySelect({
        className: 'category_select_main',
        categoryList,
      }).component,
    );
    super.addComponent(
      '.category_select_regist',
      new CategorySelect({
        className: 'category_select_regist',
        categoryList,
        defaultOption: categoryList[0],
      }).component,
    );
  }

  displayActiveTap(isAllPage: boolean) {
    const allView = this.$newEl.querySelector('.all_view') as HTMLAnchorElement;
    const myView = this.$newEl.querySelector('.my_view') as HTMLAnchorElement;

    if (isAllPage) {
      allView.classList.add('active');
      myView.classList.remove('active');
    } else {
      allView.classList.remove('active');
      myView.classList.add('active');
    }
  }

  getTemplate() {
    return manageTemplate();
  }
}
