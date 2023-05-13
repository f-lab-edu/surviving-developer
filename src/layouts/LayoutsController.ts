import Controller from '../core/Controller';
import LayoutView from './LayoutView.ts';

type ModalEvent = {
  readonly modalName: string;
  props?: unknown;
};

export default class LayoutController extends Controller {
  constructor(view: LayoutView) {
    super(null, view);
  }

  init() {
    this.subscribe();
  }

  subscribe() {
    const $app = document.querySelector('#app') as HTMLDivElement;
    $app.addEventListener('@openModal', ((event: CustomEvent<ModalEvent>) => {
      this.view.openModal(event.detail);
    }) as EventListenerOrEventListenerObject);
  }
}
