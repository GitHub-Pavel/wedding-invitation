import { FC, RefObject } from "react";
import { Heading, HeadingVariant } from "@/shared/ui/heading";
import { Color } from "@/shared/const/styles";
import styles from "./styles.module.scss";
import { useDay } from "../../model";
import clsx from "clsx";
import { useIsMobile } from "@/entities/mobile";

interface DayProps {
  day: number;
  currentDay?: number;
  parent: RefObject<HTMLDivElement | null>;
}

export const Day: FC<DayProps> = ({ day, currentDay, parent }) => {
  const isMobile = useIsMobile();
  const { scopes } = useDay(parent, day);
  const headingVariant = isMobile ? HeadingVariant.h4 : HeadingVariant.h3;

  return (
    <div className={styles.day}>
      <Heading
        variant={headingVariant}
        color={currentDay === day ? Color.white : Color.main}
        scopes={{ wrap: scopes.scope1 }}
      >
        {day}
      </Heading>
      {currentDay === day && (
        <div
          ref={scopes.scope2}
          className={clsx("heart", "heart--slower", styles.heart)}
        />
      )}
    </div>
  );
};
