import { PropsWithScopes } from "@/shared/types";
import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate,
  useInView,
} from "motion/react";
import { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import { ImageScopes } from "./types";

interface ImagesReturn extends PropsWithScopes<ImageScopes> {
  state: {
    isAppeared: boolean;
  };
}

const appearValues: (
  hasBack?: boolean,
  delay?: number
) => [DOMKeyframesDefinition, AnimationOptions] = (
  hasBack = false,
  delay = 0
) => [
  {
    x: 0,
    y: 0,
    rotate: hasBack ? 0 : 360,
    opacity: 1,
  },
  {
    delay,
    duration: 0.8,
    ease: "circOut",
    opacity: {
      delay,
      ease: "linear",
      duration: 0.3,
    },
  },
];

export const useImages = (
  parent: RefObject<HTMLDivElement | null>,
  disable?: boolean
): ImagesReturn => {
  const inView = useInView(parent);
  const [scope1, animate1] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [isAppeared, setIsAppeared] = useState(false);

  const handleAppearance = useCallback(async () => {
    animate2(scope2.current, ...appearValues(false, 0.3));
    await animate1(scope1.current, ...appearValues(true));
    setIsAppeared(true);
  }, [animate1, animate2, scope1, scope2]);

  useEffect(() => {
    if (!inView || disable) return;
    handleAppearance();
  }, [disable, handleAppearance, inView]);

  return useMemo(
    () => ({ scopes: { scope1, scope2 }, state: { isAppeared } }),
    [isAppeared, scope1, scope2]
  );
};
