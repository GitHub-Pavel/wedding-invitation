import { AnimationScope } from "motion/react";

export interface BackgroundScopes {
  scope1?: AnimationScope<HTMLImageElement>;
  scope2?: AnimationScope<HTMLImageElement>;
  scope3?: AnimationScope<HTMLImageElement>;
  scope4?: AnimationScope<HTMLImageElement>;
  scope5?: AnimationScope<HTMLDivElement>;
}

export interface ImageScopes {
  scope1?: AnimationScope<HTMLImageElement>;
  scope2?: AnimationScope<HTMLImageElement>;
  scope3?: AnimationScope<HTMLDivElement>;
}
