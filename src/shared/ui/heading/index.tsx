import clsx from "clsx";
import {
  FC,
  forwardRef,
  HTMLAttributes,
  JSX,
  PropsWithChildren,
  RefAttributes,
} from "react";
import { Color } from "@/shared/const/styles";
import { PropsWithClassname, PropsWithScopes } from "@/shared/types";
import { HeadingAlign, HeadingVariant } from "./const";
import { HeadingScopes } from "./types";
import styles from "./heading.module.scss";

type Element = FC<
  PropsWithClassname<PropsWithChildren<RefAttributes<HTMLElement>>>
>;

interface HeadingProps
  extends PropsWithClassname<
    PropsWithChildren<PropsWithScopes<HeadingScopes>>
  > {
  tagName?: keyof JSX.IntrinsicElements;
  variant?: HeadingVariant;
  align?: HeadingAlign;
  fullWidth?: boolean;
  lineSize?: number;
  italic?: boolean;
  color?: Color;
}

export const _heading = forwardRef<HTMLDivElement, HeadingProps>(
  (
    {
      variant = HeadingVariant.h2,
      align = HeadingAlign.center,
      color = Color.main,
      tagName = variant,
      fullWidth,
      className,
      lineSize,
      children,
      scopes,
      italic,
    },
    ref
  ) => {
    const headingClasses = clsx(
      className,
      styles.wrap,
      styles[variant],
      `color-${color}`,
      "heading",
      {
        [styles.fullWidth]: fullWidth,
      }
    );
    const TagName = tagName as unknown as Element;
    const lineStyles: HTMLAttributes<HTMLDivElement> = lineSize
      ? { style: { width: lineSize } }
      : {};

    return (
      <div className={styles[align]} ref={ref}>
        <div ref={scopes?.wrap} className={headingClasses}>
          <TagName
            ref={scopes?.heading}
            className={clsx(styles.heading, "heading__text", {
              [styles.italic]: italic,
            })}
          >
            {children}
          </TagName>
          {variant === HeadingVariant.h2 && (
            <div
              {...lineStyles}
              ref={scopes?.line}
              className={clsx(styles.line, "heading__line")}
            />
          )}
        </div>
      </div>
    );
  }
);

_heading.displayName = "Heading";
export const Heading = _heading;
export * from "./types";
export * from "./const";
