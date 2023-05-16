import Controller from '../core/Controller.ts';
import LayoutView from './LayoutView.ts';

export type ModalInfo = {
  readonly modalName: string;
  props?: unknown;
};

export default class LayoutController extends Controller {
  view: LayoutView;

  constructor(view: LayoutView) {
    super(null, view);
    this.view = view;
  }

  init() {
    this.subscribe();
  }

  subscribe() {
    const $app = document.querySelector('#app') as HTMLDivElement;
    $app.addEventListener('@openModal', ((event: CustomEvent<ModalInfo>) => {
      this.view.openModal(event.detail);
    }) as EventListenerOrEventListenerObject);
  }
}
