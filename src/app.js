import QuestionController from './controller/QuestionController';
import QuestionModel from './model/question/QuestionModel';
import QuestionView from './view/question/questionView';
import IndexedDB from './model/question/IndexedDB';
import Router from './router';
import ManageController from './controller/ManageController';
import ManageView from './view/manage/ManageView';
import LayoutView from './view/layouts/LayoutView';
import NotFoundView from './view/layouts/NotFoundView';

export default () => {
  const db = new IndexedDB();
  const questionModel = new QuestionModel(db);

  const renderList = {
    question() {
      const questionView = new QuestionView();
      new QuestionController(questionModel, questionView);
    },
    manage() {
      // TODO: Add Model
      new ManageController(null, new ManageView());
    },
    notFound() {
      new NotFoundView();
    },
  };

  new Router({
    renderList,
    Layout: LayoutView,
    redirect: { path: '/', replace: '/question' },
  });
};
