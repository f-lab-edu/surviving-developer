import Router from '../router';

export default class Core {
  $router: Router;

  constructor() {
    this.$router = Router.router;
  }
}
