import Router from '../router/index.ts';

export default class Core {
  $router: Router;

  constructor() {
    this.$router = Router.router;
  }
}
