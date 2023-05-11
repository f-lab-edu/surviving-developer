import QuestionManageList from './components/QuestionManageList';
import CategorySelect from './components/CategorySelect';
import manageTemplate from './manageViewTemplate';
import View from '../core/View';
import { CATEGORY_TYPE } from '../utils/constant';

export default class QuestionView extends View {
  constructor() {
    super(document.querySelector('main'));
  }

  addEvent(handlers) {
    this.$newEl.addEventListener('click', this.#runClickEvents(handlers));
    this.$newEl.addEventListener('input', this.#runInputEvents(handlers));
    this.$newEl.addEventListener('change', this.runChangeEvents(handlers));
  }

  #runInputEvents({ handleChangeInput, handleChangeTextarea }) {
    return ({ target }) => {
      if (target.classList.contains('title_input')) {
        handleChangeInput(target.value);
      }
      if (target.classList.contains('answer_textarea')) {
        handleChangeTextarea(target.value);
      }
    };
  }

  #runClickEvents({
    handleAddQuestion,
    handleDeleteQuestion,
    handleClickAnswer,
  }) {
    return ({ target }) => {
      if (target.classList.contains('save_button')) {
        const select = this.$newEl.querySelector('.category_select_regist');
        const input = this.$newEl.querySelector('input');
        const textarea = this.$newEl.querySelector('textarea');

        handleAddQuestion({
          category: select.value,
          title: input.value,
          answer: textarea.value,
        });

        select.value = CATEGORY_TYPE.JAVASCRIPT;
        input.value = '';
        textarea.value = '';
        alert('등록 되었습니다!');

        this.submitDisabled(false);
      }
      if (target.classList.contains('delete_button')) {
        if (!window.confirm('삭제 할까요?')) {
          return;
        }
        handleDeleteQuestion(target.dataset.id);
      }
      if (target.classList.contains('show_answer_button')) {
        handleClickAnswer(target.dataset.id);
      }
    };
  }

  // TODO 카테고리 변경
  runChangeEvents({ handleChangeCategory }) {
    return ({ target }) => {
      if (target.classList.contains('category_select_main')) {
        handleChangeCategory(target.value);
      }
    };
  }

  submitDisabled(isApplySubmit) {
    const submit = this.$newEl.querySelector('.save_button');
    submit.disabled = !isApplySubmit;
  }

  displaySection(isAllPage, model) {
    let questionList = model.displayQuestionList;
    if (!isAllPage) {
      questionList = model.userQuestions;
    }
    super.addComponent(
      '.question_table',
      new QuestionManageList({ questionList, isAllPage }).component,
    );
  }

  displaySelect(categoryList) {
    super.addComponent(
      '.category_select_main',
      new CategorySelect({
        // TODO: className을 따로 주지 않아도 되도록 .
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

  displayActiveTap(isAllPage) {
    const allView = this.$newEl.querySelector('.all_view');
    const myView = this.$newEl.querySelector('.my_view');

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
