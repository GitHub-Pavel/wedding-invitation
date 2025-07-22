import { IconButtonScopes } from "@/shared/ui/icon-button";
import { BackgroundScopes, ImageScopes } from "./types";
import { RefObject, useCallback, useEffect } from "react";
import {
  AnimationOptions,
  DOMKeyframesDefinition,
  useAnimate,
} from "motion/react";
import { useThrottleCallback } from "@react-hook/throttle";

interface ScrollParallaxParams {
  disable?: boolean;
  scopes: {
    images?: ImageScopes;
    toDown?: IconButtonScopes;
    background?: BackgroundScopes;
  };
}

const animOpts: AnimationOptions = {
  duration: 0.3,
  ease: "backOut",
  opacity: {
    duration: 0,
    ease: "linear",
  },
};

export const useScrollParallax = (
  parent: RefObject<HTMLDivElement | null>,
  params: ScrollParallaxParams
) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const animateParallax = useThrottleCallback((percentages: number) => {
    const receiveParams = (coef = 1.2): DOMKeyframesDefinition => ({
      y: percentages * coef * -1,
    });
    if (params.scopes.background?.scope1?.current) {
      animate(
        params.scopes.background.scope1.current,
        receiveParams(),
        animOpts
      );
    }
    if (params.scopes.background?.scope5?.current) {
      animate(
        params.scopes.background.scope5.current,
        receiveParams(),
        animOpts
      );
    }
    if (params.scopes.background?.scope2?.current) {
      animate(
        params.scopes.background.scope2.current,
        receiveParams(0.9),
        animOpts
      );
    }
    if (params.scopes.background?.scope3?.current) {
      animate(
        params.scopes.background.scope3.current,
        receiveParams(0.6),
        animOpts
      );
    }
    if (params.scopes.toDown?.icon?.current) {
      animate(
        params.scopes.toDown.icon.current,
        {
          y: percentages * 0.2 * -1,
          opacity: 1 - percentages / 40,
        },
        animOpts
      );
    }
    if (params.scopes.toDown?.text?.current) {
      animate(
        params.scopes.toDown.text.current,
        {
          y: percentages * 0.4,
          opacity: 1 - percentages / 50,
        },
        animOpts
      );
    }
    if (params.scopes.images?.scope1?.current) {
      animate(
        params.scopes.images.scope1.current,
        {
          x: percentages * 0.3 * -1,
          y: percentages * 1.1,
          rotate: percentages / 4,
          opacity: 1 - percentages / 40,
        },
        {
          duration: 0.4,
          ease: "backOut",
          opacity: {
            duration: 0,
            ease: "linear",
          },
        }
      );
    }

    const delay = 30;
    if (params.scopes.images?.scope2?.current) {
      const normalizePercentages =
        Math.max(percentages - delay, 0) * (100 / (100 - delay));
      animate(
        params.scopes.images.scope2.current,
        {
          x: normalizePercentages * 0.6,
          y: normalizePercentages * 1.1,
          rotate: 360 - normalizePercentages / 3,
          opacity: 1 - normalizePercentages / 40,
        },
        {
          duration: 0.5,
          ease: "backOut",
          opacity: {
            duration: 0,
            ease: "linear",
          },
        }
      );
    }
  }, 25);

  const calculatePercentages = useCallback(() => {
    if (params.disable) return;
    const endpoint =
      (parent.current?.offsetHeight || 0) + (parent.current?.offsetTop || 0);
    const percentages = window.scrollY / (endpoint / 100);
    if (percentages > 100 || percentages < 0) return;
    animateParallax(percentages);
  }, [animateParallax, params.disable, parent]);

  useEffect(() => {
    window.addEventListener("scroll", calculatePercentages);
    return () => {
      window.removeEventListener("scroll", calculatePercentages);
    };
  }, [calculatePercentages]);

  return scope;
};
