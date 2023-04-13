export default class QuestionModel {
  constructor(db) {
    this.db = db;
    this.questionList = [];
  }

  get builtInQuestions() {
    return this.questionList.filter(question => question.type === 'built-in');
  }

  get userQuestions() {
    return this.questionList.filter(question => question.type === 'user');
  }

  addQuestion(question) {
    const userQuestion = { ...question, type: 'user' };
    this.questionList = [...this.questionList, userQuestion];
    this.db.addOne(userQuestion);
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
