import clsx from "clsx";
import { PropsWithClassname, PropsWithScopes } from "@/shared/types";
import { FC, forwardRef, JSX, PropsWithChildren, RefAttributes } from "react";
import { HeadingAlign, HeadingVariant } from "./const";
import { Color } from "@/shared/const/styles";
import styles from "./heading.module.scss";
import { HeadingScopes } from "./types";

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
              ref={scopes?.line}
              data-size={lineSize}
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
