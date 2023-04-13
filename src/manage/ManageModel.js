export default class QuestionModel {
  constructor(db) {
    this.db = db;
    this.questionList = [];
  }

  get userQuestions() {
    return this.questionList.filter(question => question.type === 'user');
  }

  addQuestion(question) {
    this.questionList = [...this.questionList, question];
    this.db.addOne(question);
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
