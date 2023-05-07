import Core from './Core.ts';
import Model from './Model.ts';
import View from './View.ts';

export default class Controller extends Core {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    super();
    this.model = model;
    this.view = view;
    this.init();
  }
  init() {}
}
