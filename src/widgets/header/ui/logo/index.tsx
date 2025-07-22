import { FC } from "react";
import { Logotype } from "@/shared/icons/logotype";
import styles from "./logo.module.scss";
import clsx from "clsx";

export interface LogoProps {
  onLogoClick?: () => void;
}

export const Logo: FC<LogoProps> = ({ onLogoClick }) => {
  return (
    <button onClick={onLogoClick} className={clsx(styles.logo, "logotype")}>
      <Logotype />
    </button>
  );
};
