type CallbackFunction = (...args: unknown[]) => void;

export const throttle = (func: CallbackFunction, delay: number) => {
  let wait = false;
  return (...args: unknown[]) => {
    if (wait) {
      return;
    }
    func(...args);
    wait = true;
    window.setTimeout(() => {
      wait = false;
    }, delay);
  };
};

export const debounce = (func: CallbackFunction, delay: number) => {
  let timeout: number;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), delay);
  };
};
