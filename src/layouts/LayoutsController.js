import Controller from './Controller';

export default class LayoutController extends Controller {
  constructor(view) {
    super(null, view);
    this.init();
  }

  async #init() {
    this.#subscribe();
  }

  #subscribe() {
    this.$app.addEventListener('@openModal', ({ detail }) => {
      this.view.openModal(detail);
    });
  }
}
