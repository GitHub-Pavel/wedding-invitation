"use client";

import { FC, RefObject } from "react";
import { Heading, HeadingVariant } from "@/shared/ui/heading";
import { useDaysLabel } from "../../model";
import { Day } from "../day";
import styles from "./dates.module.scss";

export interface DaysParams {
  label: string;
  days: number[];
  currentDay?: number;
}

interface DatesProps extends DaysParams {
  parent: RefObject<HTMLDivElement | null>;
}

export const Dates: FC<DatesProps> = ({ days, label, currentDay, parent }) => {
  const headingVariant = HeadingVariant.h3;
  const { scopes } = useDaysLabel(parent);

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
