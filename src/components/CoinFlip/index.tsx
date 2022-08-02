import React, { useCallback, useMemo, useState } from "react";
import { timer } from "../../utils/promises";

import * as styles from "./CoinFlip.module.scss";

interface CoinFlipProps {}

const CoinFlip: React.FC<CoinFlipProps> = () => {
  const [currentSide, setCurrentSide] = useState(0);
  const [busy, setBusy] = useState(false);

  const onFlip = useCallback(async () => {
    setBusy(true);

    const next = Math.floor(Math.random() * 10) + 2;

    await Promise.all(
      new Array(next).fill(0).map((_, i) => {
        return timer(i * 100).then(() => {
          setCurrentSide((currentSide + (i + 2)) % 2);
        });
      })
    );

    setBusy(false);
  }, [currentSide]);

  return (
    <div>
      <div className={styles.coin}>{currentSide === 0 ? "Tails" : "Heads"}</div>
      <div className={styles.actions}>
        <button disabled={busy} onClick={onFlip}>
          Flip
        </button>
      </div>
    </div>
  );
};

export { CoinFlip };
