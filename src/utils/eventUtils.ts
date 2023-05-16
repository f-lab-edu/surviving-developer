import Controller from '../core/Controller.ts';
import { getHasPrefixList } from './stringUtils.ts';
import { Handler } from '../types/types.ts';

const isFunction = (obj: unknown): obj is (...args: unknown[]) => unknown =>
  obj instanceof Function;

export const bindingMethods = <T extends Controller>(
  instance: T,
  prefix: string,
) => {
  const keys: string[] = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance),
  );
  const bindMethodNames = getHasPrefixList(prefix, keys);
  const handlers: Handler<any> = {};

  bindMethodNames.forEach((name: string) => {
    const method = instance[name as keyof Controller];
    if (isFunction(method)) {
      handlers[name] = method.bind(instance);
    }
  });

  instance.view.addEvent(handlers);
};
