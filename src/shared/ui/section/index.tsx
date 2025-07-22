import clsx from "clsx";
import { forwardRef, PropsWithChildren } from "react";
import { PropsWithClassname } from "@/shared/types";
import { Color } from "@/shared/const/styles";
import styles from "./styles.module.scss";

interface Section extends PropsWithChildren<PropsWithClassname> {
  color?: Color;
}

const _Section = forwardRef<HTMLDivElement, Section>(
  ({ children, className, color }, ref) => {
    return (
      <section
        ref={ref}
        className={clsx(styles.section, className, {
          [`background-${color}`]: color,
        })}
      >
        {children}
      </section>
    );
  }
);

_Section.displayName = "Section";
export const Section = _Section;
