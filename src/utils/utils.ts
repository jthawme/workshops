export const tickUpdate = (cb: () => void): ((e?: any) => void) => {
  let ticking = false;

  const update = (e?: any) => {
    cb(e);
    ticking = false;
  };

  const requestTick = (e?: any) => {
    if (!ticking) {
      requestAnimationFrame(() => update(e));
      ticking = true;
    }
  };

  return requestTick;
};

export const random = (to: number, from = 0): number => {
  return Math.random() * (to - from) + from;
};

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

export const mapRange = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const formToObject = (form: HTMLFormElement): Record<string, any> => {
  const fd = new FormData(form);
  return [...fd.entries()].reduce(
    (prev, curr) => ({
      ...prev,
      [curr[0]]: curr[1],
    }),
    {}
  );
};
