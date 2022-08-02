import React, { PropsWithChildren } from "react";

import * as styles from "./Container.module.scss";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { Container };
