import { CATEGORY_TYPE } from '../utils/constant';

export default class QuestionModel {
  constructor(db) {
    this.db = db;
    this.currentCategory = CATEGORY_TYPE.ALL;
    this.newCategory = CATEGORY_TYPE.JAVASCRIPT;
    this.newTitle = '';
    this.newAnswer = '';
    this.questionList = [];
  }

  get displayQuestionList() {
    if (this.currentCategory === CATEGORY_TYPE.ALL) {
      return this.questionList;
    }
    return this.questionList.filter(
      question => question.category === this.currentCategory,
    );
  }

  get userQuestions() {
    return this.displayQuestionList.filter(
      question => question.type === 'user',
    );
  }

  get isApplySubmit() {
    return this.newTitle && this.newAnswer;
  }

  get categoryList() {
    const categortSet = new Set();
    for (const question of this.questionList) {
      categortSet.add(question.category);
    }
    return [...categortSet];
  }

  changeTitle(value) {
    this.newTitle = value;
  }
  changeAnswer(value) {
    this.newAnswer = value;
  }

  #resetInputs() {
    this.newTitle = '';
    this.newAnswer = '';
    this.newCategory = CATEGORY_TYPE.JAVASCRIPT;
  }

  addQuestion(question) {
    this.questionList = [...this.questionList, question];
    this.db.addQuestion(question);
    this.#resetInputs();
  }

  deleteQuestion(id) {
    this.questionList = this.questionList.filter(
      question => question.id !== id,
    );
    this.db.deleteQuestion(id);
  }

  changeCategory(value) {
    this.currentCategory = value;
  }

  getQuestionById(id) {
    return this.questionList.find(question => question.id === id);
  }

  async init() {
    const data = await this.db.getAll();
    return new Promise(resolve => {
      this.questionList = data;
      this.currentId = data[0].id;

      resolve(this);
    });
  }
}
