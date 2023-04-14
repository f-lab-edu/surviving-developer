import View from '../common/View';
import layoutViewTemplate from './layoutViewTemplate';
import HeaderView from './Header/HeaderView';
import UserAnswerModal from './modals/UserAnswerModal';

export default class LayoutView extends View {
  constructor() {
    super(document.querySelector('#app'));
    this.$app = document.querySelector('#app');
    this.modalList = [];
    new HeaderView();
  }

  openModal({ modalName, props }) {
    if (modalName === 'userAnserModal') {
      const userAnswerModal = new UserAnswerModal(props);
      this.modalList.push(userAnswerModal);

      super.addComponent('.modal_area', userAnswerModal.component);
    }
    this.$app.querySelector('.modal_area').classList.add('is__show');
  }

  closeModal(modalName) {
    this.modalList[modalName].closeModal();
  }

  getTemplate() {
    return layoutViewTemplate();
  }
}
