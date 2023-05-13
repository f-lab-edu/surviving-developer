import View from '../core/View';
import layoutViewTemplate from './LayoutViewTemplate.ts';
import HeaderView from './Header/HeaderView.ts';
import UserAnswerModal from './modals/UserAnswerModal.ts';
import Modal from './modals/Modal.ts';
import { ModalInfo } from './LayoutsController.ts';

export default class LayoutView extends View {
  modalList: { [key: string]: Modal } = {};

  constructor() {
    super(document.querySelector('#app'));
    HeaderView.render();
  }

  openModal({ modalName, props }: ModalInfo) {
    if (modalName === 'userAnserModal') {
      const userAnswerModal = new UserAnswerModal(props);
      this.modalList[modalName] = userAnswerModal;

      super.addComponent('.modal_area', userAnswerModal.component);
    }
    this.$newEl.querySelector('.modal_area').classList.add('is__show');
  }

  closeModal(modalName: string) {
    this.modalList[modalName].closeModal();
  }

  getTemplate() {
    return layoutViewTemplate();
  }
}
