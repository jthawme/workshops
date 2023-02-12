import React, { useCallback, useEffect, useRef, useState } from "react";
import { listenCb } from "../../utils/events";
import { useSize } from "../../utils/hooks/useSize";
import { saveAs } from "file-saver";

import * as styles from "./Drawing.module.scss";
import { loadImage } from "../../utils/promises";

interface DrawingProps {
  images: string[];
  aspect: number;
}

type Coords = { x: number; y: number };

const Drawing: React.FC<DrawingProps> = ({ images, aspect = 9 / 16 }) => {
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(
    null
  );

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const isDrawing = useRef(false);
  const position = useRef<Coords>({ x: 0, y: 0 });

  const outer = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const size = useSize(outer);

  useEffect(() => {
    setCurrentImage(null);
    loadImage(images[currentImageIndex]).then((img) => {
      setCurrentImage(img);
    });
  }, [currentImageIndex, images]);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const ctx = canvas.current.getContext("2d");

    const unlisten = [
      listenCb(canvas.current, "mousedown", () => {
        isDrawing.current = true;
      }),
      listenCb(canvas.current, "mouseup", () => {
        isDrawing.current = false;
      }),
      listenCb(canvas.current, "mouseleave", () => {
        isDrawing.current = false;
      }),
      listenCb(canvas.current, "touchstart", (e) => {
        e.preventDefault();
        const { x, y } = e.touches[0].target.getBoundingClientRect();

        position.current.x = e.touches[0].clientX - x;
        position.current.y = e.touches[0].clientY - y;

        lastPosition = { ...position.current };
        isDrawing.current = true;
      }),
      listenCb(canvas.current, "touchend", (e) => {
        e.preventDefault();
        isDrawing.current = false;
      }),
      listenCb(canvas.current, "touchcancel", () => {
        isDrawing.current = false;
      }),
      listenCb(canvas.current, "mousemove", (e) => {
        position.current.x = e.offsetX;
        position.current.y = e.offsetY;
      }),
      listenCb(canvas.current, "touchmove", (e) => {
        e.preventDefault();
        const { x, y } = e.touches[0].target.getBoundingClientRect();

        position.current.x = e.touches[0].clientX - x;
        position.current.y = e.touches[0].clientY - y;
      }),
    ];

    let lastPosition: Coords = { ...position.current };

    const update = () => {
      if (isDrawing.current && ctx && lastPosition) {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(position.current.x, position.current.y);
        ctx.stroke();
      }

      lastPosition = { ...position.current };

      requestAnimationFrame(update);
    };

    update();

    return () => {
      unlisten.forEach((u) => u());
    };
  }, [canvas]);

  useEffect(() => {
    if (outer.current && canvas.current && size) {
      const ctx = canvas.current.getContext("2d");

      ctx?.save();

      const { width } = size;

      const height = aspect * width;
      const dpr = window.devicePixelRatio;

      canvas.current.style.width = `${width}px`;
      canvas.current.style.height = `${height}px`;
      canvas.current.width = width * dpr;
      canvas.current.height = height * dpr;

      ctx?.scale(dpr, dpr);
      ctx?.restore();
    }
  }, [outer, canvas, size, aspect]);

  const saveCanvas = useCallback(() => {
    if (!canvas.current) {
      return;
    }

    canvas.current.toBlob((blob) => {
      if (!blob) {
        return;
      }

      saveAs(blob, `${Date.now()}.png`);
    });
  }, [canvas]);

  const onClear = useCallback(() => {
    if (canvas.current) {
      const { width, height } = canvas.current;
      const ctx = canvas.current.getContext("2d");

      ctx?.clearRect(0, 0, width, height);

      if (currentImage && size) {
        ctx?.drawImage(currentImage, 0, 0, size?.width, size?.width * aspect);
      }
    }
  }, [canvas, currentImage, size, aspect]);

  useEffect(() => {
    if (!currentImage) {
      onClear();
    } else if (canvas.current && size) {
      const { width, height } = currentImage;

      const ctx = canvas.current.getContext("2d");

      ctx?.drawImage(currentImage, 0, 0, size?.width, size?.width * aspect);
    }
  }, [currentImage, onClear, canvas, size, aspect]);

  return (
    <div ref={outer}>
      <canvas className={styles.canvas} ref={canvas} />

      <div className={styles.actions}>
        <button onClick={saveCanvas}>Export image</button>
        <button onClick={onClear}>Clear page</button>
        <button
          onClick={() => setCurrentImageIndex((idx) => idx - 1)}
          disabled={currentImageIndex <= 0}
        >
          Prev Page
        </button>
        <button
          onClick={() => setCurrentImageIndex((idx) => idx + 1)}
          disabled={currentImageIndex >= images.length - 1}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export { Drawing };
