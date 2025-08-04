"use client";

import { FC } from "react";
import { useSections } from "@/shared/sections";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Item } from "./item";
import { useIsMobile } from "@/entities/mobile";

export const DesktopMenu: FC = () => {
  const sections = useSections();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <ul className={clsx(styles.ul, "main-menu")}>
      {sections.map((section) => (
        <li key={`desktop-item-${section.id}`}>
          <Item {...section} />
        </li>
      ))}
    </ul>
  );
};
