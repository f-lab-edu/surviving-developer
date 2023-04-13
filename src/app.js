import QuestionController from './controller/QuestionController';
import QuestionModel from './model/question/QuestionModel';
import QuestionView from './view/question/questionView';
import IndexedDB from './model/question/IndexedDB';

export default () => {
  const db = new IndexedDB();
  const model = new QuestionModel(db);
  const view = new QuestionView();
  new QuestionController(model, view);
};
