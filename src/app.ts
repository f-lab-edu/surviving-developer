import QuestionController from './question/QuestionController.ts';
import QuestionModel from './question/QuestionModel.ts';
import QuestionView from './question/QuestionView.ts';
import IndexedDB from './common/IndexedDB.ts';
import Router from './router/index.ts';
import ManageController from './manage/ManageController.ts';
import ManageModel from './manage/ManageModel.ts';
import ManageView from './manage/ManageView.ts';
import LayoutView from './layouts/LayoutView.ts';
import NotFoundView from './layouts/NotFound/NotFoundView.ts';
import LayoutController from './layouts/LayoutsController.ts';

import { RenderList } from './router/types.ts';

export default async () => {
  const db = new IndexedDB();
  await db.init();
  new LayoutController(new LayoutView());

  const renderList: RenderList = {
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
