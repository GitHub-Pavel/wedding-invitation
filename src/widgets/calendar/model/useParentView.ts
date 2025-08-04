import { useIsMobile } from "@/entities/mobile";
import { useInView } from "motion/react";
import { RefObject } from "use-callback-ref/dist/es5/types";

export const useParentView = (parent: RefObject<HTMLDivElement | null>) => {
  const isMobile = useIsMobile();

  const inView = useInView(parent, {
    margin: `${isMobile ? "-30%" : "-10%"} 0px -70%`,
  });

  return inView;
};
