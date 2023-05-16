type Function = (...args: unknown[]) => void;

export const throttle = (func: Function, delay: number) => {
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

export const debounce = (func: Function, delay: number) => {
  let timeout: number;
  return (...args: unknown[]) => {
    const context = this;
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(context, args), delay);
  };
};
