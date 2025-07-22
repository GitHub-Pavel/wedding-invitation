import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate,
  useInView,
} from "motion/react";
import { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import { useLoading } from "@/entities/loading";
import { BackgroundScopes } from "./types";
import { PropsWithScopes } from "@/shared/types";

const initValues: [DOMKeyframesDefinition, AnimationOptions] = [
  { bottom: -400, opacity: 0 },
  { duration: 0 },
];

const appearValues = (
  delay = 0
): [DOMKeyframesDefinition, AnimationOptions] => [
  { bottom: 0, opacity: 1 },
  {
    delay,
    duration: 0.3,
    ease: "easeOut",
  },
];

type ReturnProps = {
  state: {
    isAppeared: boolean;
  };
} & PropsWithScopes<BackgroundScopes>;

export const useBackground = (
  parent: RefObject<HTMLDivElement | null>
): ReturnProps => {
  const { loaded } = useLoading();
  const inView = useInView(parent, {
    margin: "-300px 0px 0px 0px",
  });
  const [isAppeared, setIsAppeared] = useState(false);
  const [scope1, animate1] = useAnimate<HTMLImageElement>();
  const [scope2, animate2] = useAnimate<HTMLImageElement>();
  const [scope3, animate3] = useAnimate<HTMLImageElement>();
  const [scope4, animate4] = useAnimate<HTMLImageElement>();
  const [scope5, animate5] = useAnimate<HTMLImageElement>();

  const handleAppearance = useCallback(async () => {
    animate1(scope1.current, ...appearValues());
    animate2(scope2.current, ...appearValues(0.2));
    await animate3(scope3.current, ...appearValues(0.3));
    setIsAppeared(true);
    await animate4(scope4.current, ...appearValues());
    animate5(scope5.current, { opacity: 1 }, { duration: 1 });
  }, [
    animate1,
    animate2,
    animate3,
    animate4,
    animate5,
    scope1,
    scope2,
    scope3,
    scope4,
    scope5,
  ]);

  // init
  useEffect(() => {
    animate1(scope1.current, ...initValues);
    animate2(scope2.current, ...initValues);
    animate3(scope3.current, ...initValues);
    animate4(scope4.current, { opacity: 0 }, initValues[1]);
    animate5(scope5.current, { opacity: 0 }, initValues[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // appear
  useEffect(() => {
    if (!loaded || !inView || isAppeared) return;
    handleAppearance();
  }, [loaded, inView, handleAppearance, isAppeared]);

  return useMemo(
    () => ({
      scopes: {
        scope1,
        scope2,
        scope3,
        scope4,
        scope5,
      },
      state: {
        isAppeared,
      },
    }),
    [isAppeared, scope1, scope2, scope3, scope4, scope5]
  );
};
