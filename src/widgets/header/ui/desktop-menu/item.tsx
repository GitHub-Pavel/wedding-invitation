"use client";

import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { Section } from "@/shared/sections";
import styles from "./styles.module.scss";

const handleMenuClick = (section: Section) => () => {
  if (typeof window === undefined || !section.ref.current) return;
  window.scrollTo({
    top: section.ref.current.offsetTop,
    behavior: "smooth",
  });
};

export const Item: FC<Section> = (section) => {
  const [hasCurrent, setHasCurrent] = useState(false);

  const receiveHasCurrent = (section: Section) => () => {
    if (typeof window === undefined) return setHasCurrent(false);
    const top = section.ref.current?.offsetTop || 0;
    const bottom = top + (section.ref.current?.offsetHeight || 0);
    if (window.scrollY >= top && window.scrollY < bottom) {
      return setHasCurrent(true);
    }
    return setHasCurrent(false);
  };

  useEffect(() => {
    const handleHasCurrent = receiveHasCurrent(section);
    handleHasCurrent();
    window.addEventListener("scroll", handleHasCurrent);
    return () => {
      window.removeEventListener("scroll", handleHasCurrent);
    };
  }, []);

  return (
    <button
      className={clsx(styles.btn, {
        current: hasCurrent,
      })}
      onClick={handleMenuClick(section)}
    >
      {section.label}
    </button>
  );
};
