import Image from "next/image";
import { FC, useState } from "react";
import { Color } from "@/shared/const/styles";
import { Heading, HeadingVariant } from "@/shared/ui/heading";
import styles from "./days.module.scss";

export interface DaysProps {
  label: string;
  days: number[];
  currentDay?: number;
}

export const Days: FC<DaysProps> = ({ days, label, currentDay }) => {
  const [headingVariant] = useState(HeadingVariant.h3);
  return (
    <div className={styles.wrap}>
      <Heading variant={headingVariant}>{label}</Heading>
      <div className={styles.days}>
        {days.map((day) => (
          <div key={`day-${day}`} className={styles.day}>
            <Heading
              variant={headingVariant}
              color={currentDay === day ? Color.white : Color.main}
            >
              {day}
            </Heading>
            {currentDay === day && (
              <Image
                width={60}
                height={60}
                quality={100}
                className={styles.heart}
                src="/dateTime/heart.png"
                alt="Сердце: дата свадьбы!"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
