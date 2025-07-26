import { RefObject } from "react";

export const arrayRef =
  <T extends HTMLElement>(ref?: RefObject<T[]>) =>
  (e: T) => {
    ref?.current.push(e);
  };
