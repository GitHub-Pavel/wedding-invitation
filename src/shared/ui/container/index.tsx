"use client";

import { forwardRef, PropsWithChildren } from "react";
import styles from "./container.module.scss";
import clsx from "clsx";
import { PropsWithClassname } from "@/shared/types";

const _container = forwardRef<
  HTMLDivElement,
  PropsWithClassname<PropsWithChildren>
>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={clsx(styles.container, className, "container")}>
      {children}
    </div>
  );
});

_container.displayName = "Container";
export const Container = _container;
