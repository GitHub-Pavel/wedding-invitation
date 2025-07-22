"use client";

import { clsx } from "clsx";
import { ButtonHTMLAttributes, FC, RefAttributes, useState } from "react";
import { Color } from "@/shared/const/styles";
import { SVGForwardRef, SVGProps } from "@/shared/icons/types";
import { PropsWithClassname, PropsWithScopes } from "@/shared/types";
import { IconButtonPosition, IconButtonSize } from "./const";
import { IconButtonScopes } from "./types";
import styles from "./styles.module.scss";

type IconButtonProps = PropsWithClassname<{
  position?: IconButtonPosition;
  enableStroke?: boolean;
  size?: IconButtonSize;
  icon: SVGForwardRef;
  hoverColor?: Color;
  color?: Color;
}> &
  ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithScopes<IconButtonScopes>;

export const IconButton: FC<IconButtonProps> = ({
  position = IconButtonPosition.top,
  size = IconButtonSize.lg,
  hoverColor = Color.dirty,
  color = Color.white,
  enableStroke,
  icon: Icon,
  className,
  children,
  scopes,
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);

  const buttonClasses = clsx(
    className,
    styles.btn,
    styles[size],
    styles[position],
    "icon-button",
    {
      [`color-${color}`]: !isHover,
      [`color-${hoverColor}`]: isHover,
      [styles.stroke]: enableStroke,
    }
  );

  const iconProps: SVGProps<RefAttributes<SVGSVGElement>> = {
    ref: scopes?.icon,
    className: clsx(styles.icon, "icon-button__icon"),
  };

  return (
    <button
      ref={scopes?.btn}
      className={buttonClasses}
      onMouseLeave={() => setIsHover(false)}
      onMouseMove={() => setIsHover(true)}
      {...props}
    >
      {position === IconButtonPosition.top && <Icon {...iconProps} />}
      <span
        ref={scopes?.text}
        className={clsx(styles.text, "icon-button__text")}
      >
        {children}
      </span>
      {position === IconButtonPosition.right && <Icon {...iconProps} />}
    </button>
  );
};
