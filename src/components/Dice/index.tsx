import React, { useCallback, useMemo, useState } from "react";

import { ReactComponent as One } from "./images/1.svg";
import { ReactComponent as Two } from "./images/2.svg";
import { ReactComponent as Three } from "./images/3.svg";
import { ReactComponent as Four } from "./images/4.svg";
import { ReactComponent as Five } from "./images/5.svg";
import { ReactComponent as Six } from "./images/6.svg";

import * as styles from "./Dice.module.scss";
import { clamp } from "../../utils/utils";
import { timer } from "../../utils/promises";

const faces = [One, Two, Three, Four, Five, Six];

interface DiceProps {
  num: number;
  canIncrement?: boolean;
}

const Dice: React.FC<DiceProps> = ({ num, canIncrement = false }) => {
  const [currentNum, setCurrentNum] = useState((num - 1 + 6) % 6);
  const [busy, setBusy] = useState(false);

  const El = useMemo(() => {
    return faces[currentNum];
  }, [currentNum]);

  const onRoll = useCallback(async () => {
    setBusy(true);

    const next = Math.floor(Math.random() * 10) + 6;

    await Promise.all(
      new Array(next).fill(0).map((_, i) => {
        return timer(i * 100).then(() => {
          setCurrentNum((currentNum + (i + 6)) % 6);
        });
      })
    );

    setBusy(false);
  }, [currentNum]);

  const change = useCallback(
    (mod: number) => {
      setCurrentNum(clamp(currentNum + mod, 0, 5));
    },
    [currentNum]
  );

  return (
    <div className={styles.outer}>
      <El />

      <div className={styles.actions}>
        <button disabled={busy} onClick={onRoll}>
          Roll
        </button>

        {canIncrement ? (
          <>
            <button
              onClick={() => change(-1)}
              disabled={busy || currentNum === 0}
            >
              Minus 1
            </button>
            <button
              onClick={() => change(1)}
              disabled={busy || currentNum >= 5}
            >
              Add 1
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export { Dice };
