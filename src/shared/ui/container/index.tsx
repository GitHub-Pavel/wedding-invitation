"use client";

import { FC, PropsWithChildren } from "react";
import styles from "./container.module.scss";
import clsx from "clsx";

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={clsx(styles.container, "container")}>{children}</div>;
};
