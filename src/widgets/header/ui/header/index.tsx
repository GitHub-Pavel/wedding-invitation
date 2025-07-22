"use client";

import clsx from "clsx";
import { FC } from "react";
import { Container } from "@/shared/ui/container";
import { ChatForGuests } from "../chat-for-guests";
import { DesktopMenu } from "../desktop-menu";
import { Logo, LogoProps } from "../logo";
import styles from "./header.module.scss";

export enum HeaderVariants {
  normal = 0,
  hidden = "hidden",
  advanced = "advanced",
}

interface HeaderProps extends LogoProps {
  variants?: HeaderVariants | HeaderVariants[];
}

export const Header: FC<HeaderProps> = ({
  variants = HeaderVariants.normal,
  onLogoClick,
}) => {
  const arrVariants = Array.isArray(variants) ? variants : [variants];

  return (
    <header
      className={clsx(styles.header, {
        [styles.hidden]: arrVariants.includes(HeaderVariants.hidden),
        [styles.advanced]: arrVariants.includes(HeaderVariants.advanced),
      })}
    >
      <Container>
        <div className={styles.grid}>
          <div className={styles.logo}>
            <Logo onLogoClick={onLogoClick} />
          </div>

          <DesktopMenu />

          <div className={styles.chatForGuests}>
            <ChatForGuests />
          </div>
        </div>
      </Container>
    </header>
  );
};
