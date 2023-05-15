import routes from './routes.ts';
import { RenderList, RedirectList, Route } from './types.ts';

interface ConvertedRoute extends Route {
  initalParams: string[];
  params: Record<string, string>;
  render: () => void;
  regex: RegExp;
}

export default class Router {
  private renderList!: RenderList;
  private redirect!: RedirectList;
  params!: Record<string, string>;
  /* eslint no-use-before-define: "off" */
  static router: Router;
  private routes!: ConvertedRoute[];

  static createRouter({
    renderList,
    redirect,
  }: {
    renderList: RenderList;
    redirect: RedirectList;
  }) {
    const router = new Router();
    router.renderList = renderList;
    router.routes = router.convertRoutes(routes);
    router.redirect = redirect;
    router.params = {};
    this.router = router;
    router.init();
  }

  private init() {
    this.addEvent();

    let path = window.location.pathname;
    if (this.redirect) {
      path = path === this.redirect.path ? this.redirect.replace : path;
    }

    this.render(path);
    window.history.pushState({ path }, '', path);
  }

  private convertRoutes(routeParams: Route[]): ConvertedRoute[] {
    return routeParams.map((route) => {
      let { path } = route;
      let initalParams: string[] = [];

      const matched = path.match(/:\w+/g);
      if (matched) {
        initalParams = matched.map((v) => v.slice(1));
        path = path.slice(0, path.indexOf(':') - 1);
      }
      const render = this.renderList?.[route.name];
      const regex = new RegExp(path.replaceAll(/\//g, '\\/'));
      return { ...route, path, initalParams, params: {}, render, regex };
    });
  }

  push({ path }: { path: string }) {
    const currentPath = window.location.pathname;
    if (currentPath === path) {
      return;
    }
    window.history.pushState({ path }, '', path);
    this.render(path);
  }

  replace({ path }: { path: string }) {
    window.history.replaceState({ path }, '', path);
    this.checkRouter(path);
  }

  private handleRoute(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName !== 'A' || !target.dataset.route) {
      return;
    }

    event.preventDefault();

    const path = target.dataset.route;
    this.push({ path });
  }

  private handlePopState() {
    if (!window.history.state) {
      return;
    }
    this.render(window.history.state.path);
  }

  private addEvent() {
    // event 등록
    window.addEventListener('popstate', this.handlePopState.bind(this), true);
    window.addEventListener('click', this.handleRoute.bind(this), true);
  }

  private getParamedRouter(targetRoute: ConvertedRoute, path: string) {
    if (targetRoute.initalParams.length < 1) {
      return targetRoute;
    }
    const paramsList = path.split('/').slice(2);
    const machedParams = paramsList.reduce<Record<string, string>>(
      (acc, cur, index) => ({ ...acc, [targetRoute.initalParams[index]]: cur }),
      {},
    );
    targetRoute.params = machedParams;
    return targetRoute;
  }

  private checkRouter(path: string) {
    this.routes = this.convertRoutes(routes);
    const targetRoute = this.routes.find((route) => route.regex.test(path));

    let resultRoute: ConvertedRoute;
    if (targetRoute) {
      resultRoute = this.getParamedRouter(targetRoute, path);
    } else {
      const notFoundRoute = this.routes.find(
        (route) => route.name === 'notFound',
      );
      // TODO: ConvertedRoute | undefined 인 경우 처리를 어떻게 해주어야할까?
      resultRoute = notFoundRoute!;
    }

    this.params = resultRoute.params;
    this.addBrowserTitle(resultRoute);

    return resultRoute;
  }

  private addBrowserTitle(router: ConvertedRoute) {
    if (router.title) {
      document.title = router.title;
    }
  }

  private render(path: ConvertedRoute['path']) {
    const resultRoute = this.checkRouter(path);
    if (resultRoute) {
      resultRoute.render();
      return;
    }
    throw new Error('route 값이 정확하지 않습니다.');
  }
}
