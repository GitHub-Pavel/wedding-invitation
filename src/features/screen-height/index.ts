"use client";

import { FC, PropsWithChildren, useEffect } from "react";

export const ScreenHeightProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    function adjustHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    window.addEventListener("orientationchange", adjustHeight);
  }, []);
  return children;
};
