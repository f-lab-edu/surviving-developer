import Controller from './Controller';

export default class LayoutController extends Controller {
  constructor(view) {
    super(null, view);
    this.init();
  }

  async init() {
    this.render();
  }

  render() {}
}
