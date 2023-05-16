export interface RenderList {
  [renderFunction: string]: () => void;
}

export interface RedirectList {
  path: string;
  replace: string;
}

export interface Route {
  path: string;
  name: string;
  title: string;
}
