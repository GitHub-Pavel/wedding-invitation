import { FC, useRef } from "react";
import { Heading } from "@/shared/ui/heading";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { useSectionRegistration } from "@/shared/sections";
import styles from "./date.module.scss";
import { Days, DaysProps } from "../days/days";
import { useH2Appearing } from "@/features/h2-appearing";
import { Color } from "@/shared/const/styles";

const WEEKS: DaysProps[] = [
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

export const Date: FC = () => {
  const date = useRef<HTMLDivElement>(null);
  const { props } = useH2Appearing();

  useSectionRegistration({
    ref: date,
    id: "date",
    label: "Дата",
  });

  return (
    <Section ref={date} color={Color.crema} className={styles.section}>
      <Container>
        <div className={styles.calendar}>
          <Heading {...props}>Сентябрь</Heading>
          <div className={styles.daysWrap}>
            {WEEKS.map((days) => (
              <Days key={`days-${days.label}`} {...days} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
