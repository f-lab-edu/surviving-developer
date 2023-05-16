import Core from './Core.ts';
import Model from './Model.ts';
import View from './View.ts';

export default abstract class Controller extends Core {
  model: Model | null;
  view: View;

  constructor(model: Model | null, view: View) {
    super();
    this.model = model;
    this.view = view;
    this.init();
  }
  abstract init(): void;
}
