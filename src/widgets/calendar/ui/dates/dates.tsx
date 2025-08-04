"use client";

import { FC, RefObject } from "react";
import { Heading, HeadingVariant } from "@/shared/ui/heading";
import { useDaysLabel } from "../../model";
import { Day } from "../day";
import styles from "./dates.module.scss";
import { useIsMobile } from "@/entities/mobile";

export interface DaysParams {
  label: string;
  days: number[];
  currentDay?: number;
}

interface DatesProps extends DaysParams {
  parent: RefObject<HTMLDivElement | null>;
}

export const Dates: FC<DatesProps> = ({ days, label, currentDay, parent }) => {
  const isMobile = useIsMobile();
  const { scopes } = useDaysLabel(parent);
  const headingVariant = isMobile ? HeadingVariant.h4 : HeadingVariant.h3;

  return (
    <div className={styles.wrap}>
      <Heading variant={headingVariant} scopes={scopes}>
        {label}
      </Heading>
      <div className={styles.days}>
        {days.map((day) => (
          <Day
            key={`day-${day}`}
            currentDay={currentDay}
            parent={parent}
            day={day}
          />
        ))}
      </div>
    </div>
  );
};
