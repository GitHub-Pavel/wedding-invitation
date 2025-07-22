import { PropsWithScopes } from "@/shared/types";
import { IconButtonScopes } from "@/shared/ui/icon-button";
import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate,
  useInView,
} from "motion/react";
import { RefObject, useCallback, useEffect, useMemo, useState } from "react";

const initOpts: AnimationOptions = { duration: 0 };

const appearValues: [DOMKeyframesDefinition, AnimationOptions] = [
  { y: 0, opacity: 1 },
  {
    duration: 0.3,
    ease: "easeOut",
  },
];

interface ToDownResult extends PropsWithScopes<IconButtonScopes> {
  state: {
    isAppeared: boolean;
  };
}

export const useToDown = (
  parent: RefObject<HTMLDivElement | null>,
  disable?: boolean
): ToDownResult => {
  const inView = useInView(parent);
  const [icon, animate1] = useAnimate();
  const [text, animate2] = useAnimate();
  const [isAppeared, setIsAppeared] = useState(false);

  const handleAppearing = useCallback(async () => {
    animate1(icon.current, ...appearValues);
    await animate2(text.current, ...appearValues);
    setIsAppeared(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // init
  useEffect(() => {
    animate1(icon.current, { opacity: 0, y: -20 }, initOpts);
    animate2(text.current, { opacity: 0, y: 20 }, initOpts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // appear
  useEffect(() => {
    if (!inView || disable) return;
    handleAppearing();
  }, [inView, disable, handleAppearing]);

  return useMemo(
    () => ({
      scopes: {
        icon,
        text,
      },
      state: {
        isAppeared,
      },
    }),
    [icon, isAppeared, text]
  );
};
