export const debounce = (func: any, duration: number) => {
  let timeout: any;
  // @ts-ignore
  return function (...args) {
    const effect = () => {
      timeout = null;
      // @ts-ignore
      return func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(effect, duration);
  };
};
