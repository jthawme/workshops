import React, { ElementType, PropsWithChildren } from "react";
import classNames from "classnames";

import * as styles from "./Title.module.scss";

interface TitleProps {
  tagName?: ElementType;
  className?: string;
  size?: "small" | "medium" | "large";
  lined?: boolean;
}

const Title: React.FC<PropsWithChildren<TitleProps>> = ({
  tagName: El = "span",
  size = "medium",
  className,
  children,
  lined = false,
}) => {
  return (
    <El
      className={classNames(
        styles.title,
        { [styles[size]]: true, [styles.lined]: lined },
        className
      )}
    >
      {children}
    </El>
  );
};

export { Title };
