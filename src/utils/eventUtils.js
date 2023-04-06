export const throttle = (func, delay) => {
  let wait = false;
  return (...args) => {
    if (wait) {
      return;
    }
    func(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
};

export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};
