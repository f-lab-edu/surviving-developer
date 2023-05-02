import Core from './Core';

export default class Controller extends Core {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
    this.init();
  }
  init() {}
}
