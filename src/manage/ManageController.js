import Controller from './Controller';

export default class ManageController extends Controller {
  // constructor(model, view) {
  constructor(view) {
    // TODO: add model
    // this.model = model;
    super(null, view);
    this.init();
  }

  async init() {
    // await this.model.setDB();

    this.render();
  }

  render() {}
}
