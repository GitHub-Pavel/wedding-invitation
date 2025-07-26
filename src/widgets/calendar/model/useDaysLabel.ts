"use client";

import { PropsWithScopes } from "@/shared/types";
import { HeadingScopes } from "@/shared/ui/heading";
import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate,
} from "motion/react";
import { RefObject, useCallback, useEffect, useMemo } from "react";
import { useParentView } from "./useParentView";

type CalendarReturn = PropsWithScopes<HeadingScopes>;

export const useDaysLabel = (
  parent: RefObject<HTMLDivElement | null>
): CalendarReturn => {
  const [wrap, animate] = useAnimate();
  const isInView = useParentView(parent);

  const animateCalendar = useCallback(
    (isAppearing: boolean) => {
      const animOpts: [DOMKeyframesDefinition, AnimationOptions] = [
        {
          opacity: isAppearing ? 1 : 0,
        },
        isAppearing
          ? {
              duration: 0.6,
              ease: "backInOut",
            }
          : {
              duration: 0.3,
              ease: "backOut",
            },
      ];
      animate(wrap.current, ...animOpts);
    },
    [animate, wrap]
  );

  useEffect(() => animateCalendar(isInView), [isInView, animateCalendar]);

  return useMemo(
    () => ({
      scopes: { wrap },
    }),
    [wrap]
  );
};
