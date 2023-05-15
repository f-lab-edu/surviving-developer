import IndexedDB from '../common/IndexedDB.js';
import { Question } from '../question/types.ts';
import { CATEGORY_TYPE } from '../utils/constant';

export default class ManageModel {
  db: IndexedDB;
  currentCategory: CATEGORY_TYPE;
  newCategory: CATEGORY_TYPE;
  newTitle: Question['title'];
  newAnswer: Question['answer'];
  questionList: Question[];
  currentId: string;

  constructor(db: IndexedDB) {
    this.db = db;
    this.currentCategory = CATEGORY_TYPE.ALL;
    this.newCategory = CATEGORY_TYPE.JAVASCRIPT;
    this.newTitle = '';
    this.newAnswer = '';
    this.currentId = '';
    this.questionList = [];
  }

  get displayQuestionList() {
    if (this.currentCategory === CATEGORY_TYPE.ALL) {
      return this.questionList;
    }
    return this.questionList.filter(
      (question) => question.category === this.currentCategory,
    );
  }

  get userQuestions() {
    return this.displayQuestionList.filter(
      (question) => question.type === 'user',
    );
  }

  get isApplySubmit() {
    return this.newTitle && this.newAnswer;
  }

  get categoryList() {
    const categortSet = new Set<CATEGORY_TYPE>();
    for (const question of this.questionList) {
      categortSet.add(question.category);
    }
    console.log([...Array.from(categortSet)]);
    return [...Array.from(categortSet)];
  }

  changeTitle(value: string) {
    this.newTitle = value;
  }
  changeAnswer(value: string) {
    this.newAnswer = value;
  }

  private resetInputs() {
    this.newTitle = '';
    this.newAnswer = '';
    this.newCategory = CATEGORY_TYPE.JAVASCRIPT;
  }

  addQuestion(question: Question) {
    this.questionList = [...this.questionList, question];
    this.db.addQuestion(question);
    this.resetInputs();
  }

  deleteQuestion(id: Question['id']) {
    this.questionList = this.questionList.filter(
      (question) => question.id !== id,
    );
    this.db.deleteQuestion(id);
  }

  changeCategory(value: CATEGORY_TYPE) {
    this.currentCategory = value;
  }

  getQuestionById(id: Question['id']) {
    return this.questionList.find((question) => question.id === id);
  }

  async init(): Promise<ManageModel> {
    const data: Question[] = await this.db.getAll();
    return new Promise((resolve) => {
      this.questionList = data;
      this.currentId = data[0].id;

      resolve(this);
    });
  }
}
