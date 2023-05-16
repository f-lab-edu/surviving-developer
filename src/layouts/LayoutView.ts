import View from '../core/View.ts';
import layoutViewTemplate from './LayoutViewTemplate.ts';
import HeaderView from './Header/HeaderView.ts';
import UserAnswerModal, {
  UserAnswerModalProps,
} from './modals/UserAnswerModal.ts';
import Modal from './modals/Modal.ts';
import { ModalInfo } from './LayoutsController.ts';

export default class LayoutView extends View {
  modalList: { [key: string]: Modal<ModalInfo['props']> } = {};

  constructor() {
    super(document.querySelector('#app') as HTMLDivElement);
    HeaderView.render();
  }

  openModal({ modalName, props }: ModalInfo) {
    if (modalName === 'userAnserModal') {
      const userAnswerModal = new UserAnswerModal(
        props as UserAnswerModalProps,
      );
      this.modalList[modalName] = userAnswerModal;

      super.addComponent('.modal_area', userAnswerModal.component);
    }
    const $modalArea = this.$newEl.querySelector(
      '.modal_area',
    ) as HTMLDivElement;
    $modalArea.classList.add('is__show');
  }

  closeModal(modalName: string) {
    this.modalList[modalName].closeModal();
  }

  getTemplate() {
    return layoutViewTemplate();
  }
}
