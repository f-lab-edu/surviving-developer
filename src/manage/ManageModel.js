export default class QuestionModel {
  constructor(db) {
    this.db = db;
    this.currentCategory = 'all';
    this.newCategory = 'JavaScript';
    this.newTitle = '';
    this.newAnswer = '';
    this.questionList = [];
  }

  get displayQuestionList() {
    if (this.currentCategory === 'all') {
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
    this.newCategory = 'JavaScript';
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

  async init() {
    const data = await this.db.getAll();
    return new Promise(resolve => {
      this.questionList = data;
      this.currentId = data[0].id;

      resolve(this);
    });
  }
}
