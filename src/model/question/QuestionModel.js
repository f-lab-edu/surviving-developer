export default class QuestionModel {
  constructor(db) {
    this.userAnswer = '';
    this.isShowAnswer = false;
    this.db = db;
    this.currentId = '';
    this.questionList = [];
  }

  get questionIdList() {
    return this.questionList?.map(question => question.id) || [];
  }
  get currentQuestion() {
    return this.questionList.find(question => question.id === this.currentId);
  }
  get isApplySubmit() {
    return this.userAnswer && !this.isShowAnswer;
  }

  suffleList() {
    this.questionList.sort(() => Math.random() - 0.5);
    this.currentId = this.questionIdList[0];
  }
  handleChangeQuestion(direction) {
    let index = this.questionIdList.findIndex(id => id === this.currentId);
    if (direction === 'prev') {
      index -= 1;
    }
    if (direction === 'next') {
      index += 1;
    }

    const { length } = this.questionIdList;
    index = (index + length) % length;
    this.currentId = this.questionIdList[index];
    this.userAnswer = '';
  }
  handleChangeShowAnswer(isShowAnswer) {
    this.isShowAnswer = isShowAnswer;
  }
  handleChangeUserAnswer(value) {
    this.userAnswer = value;
  }
  handleAddQuestion(question) {
    this.questionList = [...this.questionList, question];
    this.db.addOne(question);
  }

  async setDB() {
    await this.db.init();
    return this.init();
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
