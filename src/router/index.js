import routes from './routes';

export default class Router {
  constructor(renderList, Layout, redirect = null) {
    this.renderList = renderList;
    this.routes = this.#convertRoutes();
    this.redirect = redirect;
    // layout그리기(layout은 한번 그려지면 변경되면 안된다.)
    new Layout();
    this.#init();
  }

  #init() {
    this.#addEvent();

    let path = window.location.pathname;
    if (this.redirect) {
      path = path === this.redirect.path ? this.redirect.replace : path;
    }
    if (path === '/') {
      path = '/question';
    }

    this.#render(path);
    window.history.pushState({ path }, null, path);
    window.$router = this;
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
      const render = this.renderList[route.name];

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

  #render(path) {
    // route에 맞는 controller 찾아서 실행
    this.routes.find(route => route.path === path).render();
  }
}
