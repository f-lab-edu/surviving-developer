import Model from '../core/Model.ts';
import { NavigationButton, Question } from './types.ts';

export default class QuestionModel extends Model {
  questionList: Question[];
  userAnswer: string;
  showsAnswer: boolean;
  currentId: string;

  // TODO: ADD type db
  constructor(db) {
    super();
    this.userAnswer = '';
    this.showsAnswer = false;
    // TODO: ADD type db
    this.db = db;
    this.currentId = '';
    this.questionList = [];
  }

  get questionIdList() {
    return this.questionList?.map((question) => question.id) || [];
  }
  get currentQuestion() {
    return this.questionList.find((question) => question.id === this.currentId);
  }
  get canSubmit() {
    return this.userAnswer && !this.showsAnswer;
  }
  get firstId() {
    return this.questionList[0].id;
  }

  suffleList() {
    this.questionList.sort(() => Math.random() - 0.5);
    this.currentId = this.questionIdList[0];
  }
  changeQuestion(direction: NavigationButton) {
    let index = this.questionIdList.findIndex((id) => id === this.currentId);
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
  setShowsAnswer(showsAnswer: boolean) {
    this.showsAnswer = showsAnswer;
  }
  changeUserAnswer(value: string) {
    this.userAnswer = value;
  }
  resetCurrentId() {
    this.currentId = this.questionList[0].id;
  }
  setCurrentId(id: string) {
    this.currentId = id;
  }
  async addAnswer(id: string, value: string) {
    try {
      // TODO: ADD type db
      const updatedData = await this.db.addAnswer(id, value);
      const targetIndex = this.questionList.findIndex(
        (question) => question.id === updatedData.id,
      );
      this.questionList[targetIndex] = updatedData;
      return true;
    } catch (error) {
      /* eslint no-console: "off" */
      console.error(error);
      return false;
    }
  }

  async init() {
    // TODO: ADD type db
    const data = await this.db.getAll();
    return new Promise((resolve) => {
      this.questionList = data;
      this.currentId = data[0].id;

      resolve(this);
    });
  }
}
