import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate,
  useInView,
} from "motion/react";
import { PropsWithScopes } from "@/shared/types";
import styles from "./h2-appearing.module.scss";
import { HeadingScopes } from "@/shared/ui/heading";

interface H2AppearingReturn {
  state: {
    isAppeared: boolean;
  };
  props: PropsWithScopes<HeadingScopes> & {
    className: string;
    ref: RefObject<HTMLDivElement | null>;
  };
}

interface H2AppearingParams {
  disable?: boolean;
  margin?: `${string}px ${string}px ${string}px`;
}

const appearParams: [DOMKeyframesDefinition, AnimationOptions] = [
  {
    y: 0,
    opacity: 1,
  },
  {
    duration: 0.6,
    ease: "backOut",
  },
];

const disappearParams = (
  y: number
): [DOMKeyframesDefinition, AnimationOptions] => [
  {
    y,
    opacity: 0,
  },
  {
    duration: 0.6,
    ease: "backOut",
  },
];

export const useH2Appearing = (
  parent?: RefObject<HTMLElement | null>,
  params?: H2AppearingParams
): H2AppearingReturn => {
  const heading = useRef<HTMLDivElement>(null);
  const isInView = useInView(parent ?? heading, {
    margin: (params?.margin as never) ?? "-240px 0px -200px",
  });
  const [scope1, animate1] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [isAppeared, setIsAppeared] = useState(false);

  const appearingHeading = useCallback(async () => {
    animate1(scope1.current, ...appearParams);
    await animate2(scope2.current, ...appearParams);
    setIsAppeared(true);
  }, [animate1, animate2, scope1, scope2]);

  const disappearingHeading = useCallback(async () => {
    animate1(scope1.current, ...disappearParams(-10));
    await animate2(scope2.current, ...disappearParams(15));
    setIsAppeared(false);
  }, [animate1, animate2, scope1, scope2]);

  useEffect(() => {
    if (!isInView || params?.disable) {
      disappearingHeading();
      return;
    }
    appearingHeading();
  }, [appearingHeading, disappearingHeading, isInView, params?.disable]);

  return useMemo(
    () => ({
      state: {
        isAppeared,
      },
      props: {
        ref: heading,
        className: styles.h2,
        scopes: {
          heading: scope1,
          line: scope2,
        },
      },
    }),
    [isAppeared, scope1, scope2]
  );
};
