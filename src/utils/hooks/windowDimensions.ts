import { useEffect, useState } from "react";
import { tickUpdate } from "../utils";

interface Dimensions {
  width?: number;
  height?: number;
}

export const useWindowDimensions = (): Dimensions => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = tickUpdate(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
