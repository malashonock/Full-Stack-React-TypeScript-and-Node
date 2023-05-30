type Func = (this: any, ...args: any[]) => any;

export const throttle = (fn: Func, timeout: number = 500): Func => {
  let timer: number | null = null;

  return function (...args: Parameters<typeof fn>): ReturnType<typeof fn> {
    if (!timer) {
      const result = fn.call(this, ...args);

      timer = window.setTimeout(() => {
        if (timer) {
          window.clearTimeout(timer);
          timer = null;
        }
      }, timeout);

      return result;
    }
  };
};
