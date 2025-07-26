import clsx from "clsx";
import { forwardRef } from "react";
import { PropsWithScopes } from "@/shared/types";
import { BorderScopes } from "../../model";
import styles from "./styles.module.scss";

type BorderProps = PropsWithScopes<BorderScopes>;

const _border = forwardRef<HTMLDivElement, BorderProps>(({ scopes }, ref) => {
  return (
    <div ref={ref} className={styles.wrap}>
      <div ref={scopes?.scope1} className={clsx(styles.line, styles.l1)} />
      <div ref={scopes?.scope2} className={clsx(styles.line, styles.l2)} />
      <div ref={scopes?.scope3} className={clsx(styles.line, styles.l3)} />
      <div ref={scopes?.scope4} className={clsx(styles.line, styles.l4)} />
      <div ref={scopes?.scope5} className={clsx(styles.line, styles.l5)} />
      <div ref={scopes?.scope6} className={clsx(styles.line, styles.l6)} />
    </div>
  );
});

_border.displayName = "Border";
export const Border = _border;
