import QuestionController from './question/QuestionController';
import QuestionModel from './question/QuestionModel';
import QuestionView from './question/questionView';
import IndexedDB from './common/IndexedDB';
import Router from './router';
import ManageController from './manage/ManageController';
import ManageView from './manage/ManageView';
import LayoutView from './layouts/LayoutView';
import NotFoundView from './layouts/NotFoundView';

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
