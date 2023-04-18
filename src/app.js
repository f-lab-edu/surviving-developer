import QuestionController from './question/QuestionController';
import QuestionModel from './question/QuestionModel';
import QuestionView from './question/questionView';
import IndexedDB from './common/IndexedDB';
import Router from './router';
import ManageController from './manage/ManageController';
import ManageModel from './manage/ManageModel';
import ManageView from './manage/ManageView';
import LayoutView from './layouts/LayoutView';
import NotFoundView from './layouts/NotFoundView';
import LayoutController from './layouts/LayoutsController';

export default async () => {
  const db = new IndexedDB();
  await db.init();
  new LayoutController(new LayoutView());

  const renderList = {
    question() {
      new QuestionController(new QuestionModel(db), new QuestionView());
    },
    manage() {
      new ManageController(new ManageModel(db), new ManageView());
    },
    notFound() {
      NotFoundView.render();
    },
  };

  Router.createRouter({
    renderList,
    redirect: { path: '/', replace: '/question' },
  });
};
