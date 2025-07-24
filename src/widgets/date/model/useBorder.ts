"use client";

import { AnimationScope } from "motion";
import { PropsWithScopes } from "@/shared/types";
import { cutPercentagesAfter, cutPercentagesBefore } from "@/shared/utils/math";
import { useThrottleCallback } from "@react-hook/throttle";
import { AnimationOptions, useAnimate, useInView } from "motion/react";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";

export interface BorderScopes {
  scope1?: AnimationScope<HTMLDivElement>;
  scope2?: AnimationScope<HTMLDivElement>;
  scope3?: AnimationScope<HTMLDivElement>;
  scope4?: AnimationScope<HTMLDivElement>;
  scope5?: AnimationScope<HTMLDivElement>;
  scope6?: AnimationScope<HTMLDivElement>;
}

type BorderReturn = PropsWithScopes<BorderScopes>;

const animOpts: AnimationOptions = {
  duration: 0.01,
  ease: "linear",
};

export const useBorder = (
  wrap: RefObject<HTMLElement | null>
): BorderReturn => {
  const lastScrollTop = useRef(0);
  const isInView = useInView(wrap);
  const [scope1, animate1] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [scope3, animate3] = useAnimate();
  const [scope4, animate4] = useAnimate();
  const [scope5, animate5] = useAnimate();
  const [scope6, animate6] = useAnimate();

  const handleDownAnimate = useThrottleCallback(
    async (percentages: number, downScroll: boolean) => {
      const topOffset = 8;
      const topPer = cutPercentagesAfter(percentages, topOffset);
      const topWidth = `${topPer / 2}%`;
      const sideOffset = 55;
      const sidePer = cutPercentagesAfter(
        cutPercentagesBefore(percentages, topOffset),
        sideOffset
      );
      const height = `${sidePer}%`;
      const botPer = cutPercentagesAfter(
        cutPercentagesBefore(
          cutPercentagesBefore(percentages, topOffset),
          sideOffset
        ),
        70
      );
      const botWidth = `${botPer / 2}%`;

      if (downScroll) {
        animate1(scope1.current, { width: topWidth }, animOpts);
        await animate2(scope2.current, { width: topWidth }, animOpts);

        animate3(scope3.current, { height }, animOpts);
        await animate4(scope4.current, { height }, animOpts);

        animate5(scope5.current, { width: botWidth }, animOpts);
        animate6(scope6.current, { width: botWidth }, animOpts);
      } else {
        animate5(scope5.current, { width: botWidth }, animOpts);
        await animate6(scope6.current, { width: botWidth }, animOpts);

        animate3(scope3.current, { height }, animOpts);
        await animate4(scope4.current, { height }, animOpts);

        animate1(scope1.current, { width: topWidth }, animOpts);
        animate2(scope2.current, { width: topWidth }, animOpts);
      }
    },
    240
  );

  const handleScroll = useCallback(() => {
    if (!isInView || !wrap.current) return;
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const scrollY = Math.max(
      window.scrollY + window.innerHeight / 2 - wrap.current.offsetTop,
      0
    );
    handleDownAnimate(
      Math.min(scrollY / (wrap.current.offsetHeight / 100), 100),
      currentScroll > lastScrollTop.current
    );
    lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
  }, [handleDownAnimate, isInView, wrap]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return useMemo(
    () => ({
      scopes: {
        scope1,
        scope2,
        scope3,
        scope4,
        scope5,
        scope6,
      },
    }),
    [scope1, scope2, scope3, scope4, scope5, scope6]
  );
};
