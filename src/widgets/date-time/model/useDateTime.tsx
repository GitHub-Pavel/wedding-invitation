import { cutPercentagesAfter, cutPercentagesBefore } from "@/shared/utils/math";
import { useThrottleCallback } from "@react-hook/throttle";
import { useAnimate, useInView } from "motion/react";
import { RefObject, useCallback, useEffect, useMemo } from "react";

export const useDateTime = (parent: RefObject<HTMLElement | null>) => {
  const isInView = useInView(parent);
  const [scope1, animate1] = useAnimate();
  const [scope2, animate2] = useAnimate();

  const animateDateTime = useThrottleCallback((percentages: number) => {
    animate2(
      scope2.current,
      {
        opacity:
          percentages === 100
            ? 0
            : Math.max(
                Math.min(cutPercentagesBefore(percentages, 20) / 10, 1),
                0
              ),
      },
      {
        duration: 0.1,
        ease: "linear",
      }
    );

    animate1(
      scope1.current,
      {
        opacity: Math.max(
          Math.min(
            1 -
              cutPercentagesAfter(cutPercentagesBefore(percentages, 70), 95) /
                10,
            1
          ),
          0
        ),
      },
      {
        duration: 0.1,
        ease: "linear",
      }
    );
  }, 30);

  const handleScrollDateTime = useCallback(() => {
    if (!isInView || !parent.current) return;
    const ver1ScrollY =
      window.scrollY + window.innerHeight - parent.current.offsetTop;
    const ver2ScrollY = window.scrollY - parent.current.offsetTop;
    const offsetHeight = parent.current.offsetHeight;
    const percentagesVer1 = Math.max(
      Math.min(ver1ScrollY / (offsetHeight / 100), 100),
      0
    );
    const percentagesVer2 = Math.max(
      Math.min(ver2ScrollY / (offsetHeight / 100), 100),
      0
    );
    animateDateTime((percentagesVer1 + percentagesVer2) / 2);
  }, [animateDateTime, isInView, parent]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollDateTime);
    return () => {
      window.removeEventListener("scroll", handleScrollDateTime);
    };
  }, [handleScrollDateTime]);

  return useMemo(() => ({ scope2, scope1 }), [scope2, scope1]);
};
