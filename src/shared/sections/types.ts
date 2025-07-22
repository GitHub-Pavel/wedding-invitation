import { RefObject } from "react";

export interface Section {
  id: string;
  label: string;
  ref: RefObject<HTMLDivElement | null>;
}
