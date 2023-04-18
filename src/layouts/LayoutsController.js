import Controller from '../core/Controller';

export default class LayoutController extends Controller {
  constructor(view) {
    super(null, view);
  }

  init() {
    this.subscribe();
  }

  subscribe() {
    document
      .querySelector('#app')
      .addEventListener('@openModal', ({ detail }) => {
        this.view.openModal(detail);
      });
  }
}
