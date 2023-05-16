import Controller from '../core/Controller.ts';

export type Handler<T extends Controller> = {
  [P in keyof T]: T[P];
};
