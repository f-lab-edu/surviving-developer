import QuestionController from './controller/QuestionController';
import QuestionModel from './model/question/QuestionModel';
import QuestionView from './view/question/questionView';
import IndexedDB from './model/question/IndexedDB';

export default async () => {
  const db = await new IndexedDB().init();
  const model = await new QuestionModel(db).init();

  new QuestionController(model, new QuestionView());
};
