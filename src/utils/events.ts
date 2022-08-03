import { tickUpdate } from "./utils";

export type UnlistenFunction = () => void;

export const listenCb = (
  el: HTMLElement | Window | Document,
  evtType: string,
  cb: (...args: any) => void,
  opts: object = {}
): UnlistenFunction => {
  el.addEventListener(evtType, cb, opts);

  return () => {
    el.removeEventListener(evtType, cb);
  };
};

export const onWindowResize = (cb): UnlistenFunction => {
  const unlisten = [
    listenCb(window, "resize", cb, {
      passive: true,
    }),
    listenCb(window, "orientationchange", cb, {
      passive: true,
    }),
  ];

  return () => {
    unlisten.forEach((u) => u());
  };
};

export const registerBootlegVH = (): UnlistenFunction => {
  const setVh = () =>
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight / 100}px`
    );

  const cb = tickUpdate(() => {
    setVh();
  });

  setVh();

  return onWindowResize(cb);
};
