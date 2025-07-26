import { useInView } from "motion/react";
import { RefObject } from "use-callback-ref/dist/es5/types";

export const useParentView = (parent: RefObject<HTMLDivElement | null>) =>
  useInView(parent, {
    margin: `-10% 0px -70%`,
  });
