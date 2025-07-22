"use client";

import { forwardRef } from "react";
import { PropsWithClassname } from "../types";

const _Telegram = forwardRef<SVGSVGElement, PropsWithClassname>(
  ({ className }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        width="19"
        height="16"
        viewBox="0 0 19 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.2342 1C17.7581 1 18.1533 1.45108 17.9419 2.29009L15.3777 14.1535C15.1985 14.997 14.6792 15.2 13.9624 14.8076L7.84597 10.3735C7.82225 10.3568 7.80293 10.3348 7.7896 10.3093C7.77626 10.2838 7.76931 10.2555 7.76931 10.2269C7.76931 10.1982 7.77626 10.17 7.7896 10.1445C7.80293 10.119 7.82225 10.097 7.84597 10.0803L14.909 3.81926C15.2307 3.53959 14.8401 3.40426 14.4173 3.65687L5.5529 9.14653C5.52601 9.16374 5.49549 9.17471 5.46364 9.17862C5.43179 9.18253 5.39946 9.17927 5.36908 9.16908L1.6055 8.00078C0.769152 7.76171 0.769152 7.19786 1.79391 6.79639L16.8528 1.09473C16.9723 1.03849 17.1019 1.00628 17.2342 1Z"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

_Telegram.displayName = "Telegram";
export const Telegram = _Telegram;
