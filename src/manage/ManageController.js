import Controller from './Controller';

export default class ManageController extends Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    await this.model.init();
    this.render();
  }

  render() {
    const builtInQuestions = this.model.builtInQuestions;
    this.view.displayBuiltInSection(builtInQuestions);
  }
}
