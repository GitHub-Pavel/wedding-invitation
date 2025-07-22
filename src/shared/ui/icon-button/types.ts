import { AnimationScope } from "motion/react";

export interface IconButtonScopes {
  icon?: AnimationScope<SVGSVGElement>;
  text?: AnimationScope<HTMLSpanElement>;
  btn?: AnimationScope<HTMLButtonElement>;
}
