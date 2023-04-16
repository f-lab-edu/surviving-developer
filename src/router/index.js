import routes from './routes';

let instance;

class RouterClass {
  #renderList;
  #routes;
  #redirect;

  constructor({ renderList, Layout, redirect }) {
    if (instance) {
      throw new Error('Router의 instance는 새로 생성할 수 없습니다.');
    }
    instance = this;

    this.#renderList = renderList;
    this.#routes = this.#convertRoutes();
    this.#redirect = redirect;
    // layout그리기(layout은 한번 그려지면 변경되면 안된다.)
    new Layout();
    this.#init();
  }

  static get instance() {
    return instance;
  }

  #init() {
    this.#addEvent();

    let path = window.location.pathname;
    if (this.#redirect) {
      path = path === this.#redirect.path ? this.#redirect.replace : path;
    }

    this.#render(path);
    window.history.pushState({ path }, null, path);
  }

  #convertRoutes() {
    return routes.map(route => {
      let { path } = route;
      let params = [];

      const matched = path.match(/:\w+/g);
      if (matched) {
        params = matched.map(v => v.slice(1));
        path = path.slice(0, path.indexOf(':') - 1);
      }
      const render = this.#renderList[route.name];

      return { ...route, path, params, render };
    });
  }

  push({ path }) {
    const currentPath = window.location.pathname;
    if (currentPath === path) {
      return;
    }
    window.history.pushState({ path }, null, path);
    this.#render(path);
  }

  replace({ path }) {
    window.history.replaceState(null, null, path);
    // this.#render(path);
  }

  #handleRoute(event) {
    const { target } = event;
    if (target.tagName !== 'A' || !target.dataset.route) {
      return;
    }

    event.preventDefault();

    const path = event.target.dataset.route;
    this.push({ path });
  }

  #handlePopState() {
    if (!window.history.state) {
      return;
    }
    this.#render(window.history.state.path);
  }

  #addEvent() {
    // event 등록
    window.addEventListener('popstate', this.#handlePopState.bind(this), true);
    window.addEventListener('click', this.#handleRoute.bind(this), true);
  }

  #getParamedRouter(targetRoute, path) {
    if (targetRoute.params.lenth < 1) {
      return targetRoute;
    }
    const paramsList = path.split('/').slice(2);
    const machedParams = paramsList.reduce(
      (acc, cur, index) => ({ ...acc, [targetRoute.params[index]]: cur }),
      {},
    );
    targetRoute.params = machedParams;
    return targetRoute;
  }

  #render(path) {
    const realPath = `/${path.split('/')[1]}`;
    const targetRoute = this.#routes.find(route => route.path === realPath);

    let resultRoute;
    if (targetRoute) {
      resultRoute = this.#getParamedRouter(targetRoute, path);
    } else {
      const notFoundRoute = this.#routes.find(
        route => route.name === 'notFound',
      );
      resultRoute = notFoundRoute;
    }

    Object.keys(resultRoute).forEach(key => {
      if (key === 'render') return;
      this[key] = resultRoute[key];
    });
    resultRoute.render();
  }
}

const Router = Object.freeze(RouterClass);
export default Router;
