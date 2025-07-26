"use client";

import { FC, useRef } from "react";
import { Heading } from "@/shared/ui/heading";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { useSectionRegistration } from "@/shared/sections";
import { Dates, DaysParams } from "../dates/dates";
import { useH2Appearing } from "@/features/h2-appearing";
import { Color } from "@/shared/const/styles";
import { useBorder } from "../../model";
import { Border } from "../border";
import styles from "./calendar.module.scss";

const WEEKS: DaysParams[] = [
  {
    days: [1, 8, 15, 22, 29],
    label: "Пн",
  },
  {
    days: [2, 9, 16, 23, 30],
    currentDay: 9,
    label: "Вт",
  },
  {
    days: [3, 10, 17, 24],
    label: "Ср",
  },
  {
    days: [4, 11, 18, 25],
    label: "Чт",
  },
  {
    days: [5, 12, 19, 25],
    label: "Пт",
  },
  {
    days: [6, 13, 20, 26],
    label: "Сб",
  },
  {
    days: [7, 14, 21, 27],
    label: "Вс",
  },
];

export const Calendar: FC = () => {
  const calendar = useRef(null);
  const { props } = useH2Appearing();
  const { scopes } = useBorder(calendar);

  useSectionRegistration({
    ref: calendar,
    id: "calendar",
    label: "Дата",
  });

  return (
    <Section ref={calendar} color={Color.crema} className={styles.section}>
      <Container>
        <div className={styles.calendar}>
          <Heading {...props} fullWidth>
            Сентябрь
          </Heading>
          <div className={styles.daysWrap}>
            {WEEKS.map((days) => (
              <Dates key={`days-${days.label}`} parent={calendar} {...days} />
            ))}
          </div>
          <Border scopes={scopes} />
        </div>
      </Container>
    </Section>
  );
};
