"use client";

import { PropsWithScopes } from "@/shared/types";
import { AnimationScope, useAnimate } from "motion/react";
import { RefObject, useCallback, useEffect, useMemo } from "react";
import { useParentView } from "./useParentView";

interface DayScopes {
  scope1: AnimationScope<HTMLDivElement>;
  scope2: AnimationScope<HTMLImageElement | null>;
}

type DayReturn = Required<PropsWithScopes<DayScopes>>;

export const useDay = (
  parent: RefObject<HTMLDivElement | null>,
  day: number
): DayReturn => {
  const [scope1, animate1] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const isInView = useParentView(parent);

  const animateCalendar = useCallback(
    (isAppearing: boolean) => {
      const week = Math.floor(day / 7);
      const col = day % 7 > 0 ? day % 7 : 7;
      const delay = (week + col) / 10 + 0.3;

      animate1(
        scope1.current,
        {
          opacity: isAppearing ? 1 : 0,
        },
        isAppearing
          ? {
              delay,
              duration: 0.6,
              ease: "backInOut",
            }
          : {
              duration: 0.3,
              ease: "backOut",
            }
      );

      if (scope2.current) {
        animate2(
          scope2.current,
          {
            opacity: isAppearing ? 1 : 0,
            scale: isAppearing ? [0.5, 1.5, 1] : 0.5,
          },
          isAppearing
            ? {
                delay,
                duration: 0.5,
                ease: "linear",
                scale: {
                  delay: delay,
                  ease: "circInOut",
                  duration: 0.6,
                },
              }
            : {
                duration: 0.3,
                ease: "backOut",
              }
        );
      }
    },
    [day, animate1, scope1, scope2, animate2]
  );

  useEffect(() => animateCalendar(isInView), [isInView, animateCalendar]);

  return useMemo(
    () => ({
      scopes: { scope1, scope2 },
    }),
    [scope1, scope2]
  );
};
