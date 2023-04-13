import QuestionList from './components/QuestionList';
import manageTemplate from './ManageViewTemplate';
import View from '../common/View';

export default class QuestionView extends View {
  constructor() {
    super(document.querySelector('main'));
  }

  addEvent(handlers) {
    this.$newEl.addEventListener('click', this.runClickEvents(handlers), true);
    this.$newEl.addEventListener('input', this.runInputEvents(handlers), true);
  }

  runInputEvents({ handleChangeInput, handleChangeTextarea }) {
    return ({ target }) => {
      if (target.classList.contains('title_input')) {
        handleChangeInput(target.value);
      }
      if (target.classList.contains('answer_textarea')) {
        handleChangeTextarea(target.value);
      }
    };
  }

  runClickEvents({ handleAddQuestion, handleDeleteQuestion }) {
    return ({ target }) => {
      if (target.classList.contains('save_button')) {
        const select = this.$newEl.querySelector('select');
        const input = this.$newEl.querySelector('input');
        const textarea = this.$newEl.querySelector('textarea');

        handleAddQuestion({
          category: select.value,
          title: input.value,
          answer: textarea.value,
        });

        select.value = 'javascript';
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
    };
  }

  submitDisabled(isApplySubmit) {
    const submit = this.$newEl.querySelector('.save_button');
    submit.disabled = !isApplySubmit;
  }

  displaySection(isAllPage, model) {
    let questionList = model.questionList;
    if (!isAllPage) {
      questionList = model.userQuestions;
    }
    super.addComponent(
      '.question_table',
      new QuestionList({ questionList, isAllPage }).component,
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
