import { forwardRef } from "react";
import { PropsWithClassname } from "../types";

export type SVGProps<T = unknown> = PropsWithClassname<T>;
export type SVGForwardRef = ReturnType<
  typeof forwardRef<SVGSVGElement, SVGProps>
>;
