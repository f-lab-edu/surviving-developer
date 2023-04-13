export default class QuestionModel {
  constructor(db) {
    this.db = db;
    this.newCategory = 'javascript';
    this.newTitle = '';
    this.newAnswer = '';
    this.questionList = [];
  }

  get userQuestions() {
    return this.questionList.filter(question => question.type === 'user');
  }

  get isApplySubmit() {
    return this.newTitle && this.newAnswer;
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
    this.newCategory = 'javascript';
  }

  addQuestion(question) {
    this.questionList = [...this.questionList, question];
    this.db.addOne(question);
    this.#resetInputs();
  }

  deleteQuestion(id) {
    this.questionList = this.questionList.filter(
      question => question.id !== id,
    );
    this.db.deleteOne(id);
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
