import { AnimationScope } from "motion/react";

export interface HeadingScopes {
  heading?: AnimationScope<HTMLElement>;
  wrap?: AnimationScope<HTMLDivElement>;
  line?: AnimationScope<HTMLDivElement>;
}
