import Controller from '../core/Controller';
import { getHasPrefixList } from './stringUtils';
import { Handler } from '../../src/types/types.ts';

export const bindingMethods = <T extends Controller>(
  instance: T,
  prefix: string,
) => {
  const keys: string[] = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance),
  );
  const bindMethodNames = getHasPrefixList(prefix, keys);
  const handlers: Handler<any> = {};
  // REVIEW: as를 사용해 이 부분을 해결해야하는지 의문.
  bindMethodNames.forEach((name: string) => {
    handlers[name] = (instance[name as keyof Controller] as Function).bind(
      instance,
    );
  });

  instance.view.addEvent(handlers);
};
