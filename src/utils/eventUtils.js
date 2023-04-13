import { getHasPrefixList } from './stringUtils';

export const bindingMethods = (instance, prefix) => {
  const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
  const bindMethodNames = getHasPrefixList(prefix, keys);
  const handlers = {};
  bindMethodNames.forEach(name => {
    handlers[name] = instance[name].bind(instance);
  });

  instance.view.addEvent(handlers);
};
