import Controller from '../core/Controller';
import { getHasPrefixList } from './stringUtils';
import { Handler } from '../../src/types/types.ts';

function isFunction(property: unknown): property is Function {
  return typeof property === 'function';
}

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
