import React, { useState, useLayoutEffect } from "react";
import useResizeObserver from "@react-hook/resize-observer";

export const useSize = (target: React.MutableRefObject<HTMLElement | null>) => {
  const [size, setSize] = useState<DOMRect>();

  useLayoutEffect(() => {
    if (target.current !== null) {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
