import IndexedDB, { Question } from '../common/IndexedDB.ts';
import Model from '../core/Model.ts';
import { CATEGORY_TYPE } from '../utils/constants.ts';

export default class ManageModel extends Model {
  db: IndexedDB;
  currentCategory: Question['category'];
  newCategory: Question['category'];
  newTitle: Question['title'];
  newAnswer: Question['answer'];
  questionList: Question[];
  currentId: string;

  constructor(db: IndexedDB) {
    super();
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

  get isApplySubmit(): boolean {
    return Boolean(this.newTitle) && Boolean(this.newAnswer);
  }

  get categoryList(): CATEGORY_TYPE[] {
    const categortSet = new Set<CATEGORY_TYPE>();
    for (const question of this.questionList) {
      categortSet.add(question.category);
    }
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
