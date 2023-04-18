import Router from '../router';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.$router = Router.instance;
    this.init();
  }
  init() {}
}
