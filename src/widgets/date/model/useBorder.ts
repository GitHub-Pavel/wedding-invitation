"use client";

import { AnimationScope } from "motion";
import { RefObject, useMemo, useRef } from "react";
import { PropsWithScopes } from "@/shared/types";
import { useThrottleCallback } from "@react-hook/throttle";
import {
  AnimationOptions,
  useAnimate,
  useAnimationFrame,
  useInView,
} from "motion/react";
import { cutPercentagesAfter, cutPercentagesBefore } from "@/shared/utils/math";

export interface BorderScopes {
  scope1?: AnimationScope<HTMLDivElement>;
  scope2?: AnimationScope<HTMLDivElement>;
  scope3?: AnimationScope<HTMLDivElement>;
  scope4?: AnimationScope<HTMLDivElement>;
  scope5?: AnimationScope<HTMLDivElement>;
  scope6?: AnimationScope<HTMLDivElement>;
}

interface BorderParams {
  fps: number;
  duration: number;
}

type BorderReturn = PropsWithScopes<BorderScopes>;

const animOpts: AnimationOptions = {
  duration: 0,
  ease: "linear",
};

const initParams: BorderParams = {
  fps: 240,
  duration: 200,
};

export const useBorder = (
  wrap: RefObject<HTMLElement | null>,
  params?: Partial<BorderParams>
): BorderReturn => {
  const opts = { ...initParams, ...params };
  const [scope1, animate1] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [scope3, animate3] = useAnimate();
  const [scope4, animate4] = useAnimate();
  const [scope5, animate5] = useAnimate();
  const [scope6, animate6] = useAnimate();
  const isInView = useInView(wrap, {
    margin: "-400px 0px -400px",
  });
  const percentages = useRef(0);

  const animateBorder = useThrottleCallback(async () => {
    const topOffset = 20;
    const sideOffset = 70;
    const topPer = cutPercentagesAfter(percentages.current, topOffset);
    const sidePer = cutPercentagesAfter(
      cutPercentagesBefore(percentages.current, topOffset),
      sideOffset
    );
    const botPer = cutPercentagesBefore(
      cutPercentagesBefore(percentages.current, topOffset),
      sideOffset
    );

    const topWidth = `${topPer / 2}%`;
    const height = `${sidePer}%`;
    const botWidth = `${botPer / 2}%`;

    if (isInView) {
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
  }, opts.fps);

  useAnimationFrame((time) => {
    const axios = [-1, 1][+isInView];
    const per = percentages.current + (time / (opts.duration * 100)) * axios;
    percentages.current = Math.max(Math.min(per, 100), 0);
    animateBorder();
  });

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
