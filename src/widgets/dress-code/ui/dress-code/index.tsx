import { FC, useRef } from "react";
import { Color } from "@/shared/const/styles";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { useSectionRegistration } from "@/shared/sections";
import { Heading, HeadingVariant } from "@/shared/ui/heading";
import { useLettersAppearing } from "@/features/letters-appearing";
import { Hearts } from "../hearts";
import styles from "./styles.module.scss";
import { useH2Appearing } from "@/features/h2-appearing";

const sectionId = "dress-code";
const sectionLabel = "Дресс-код";

export const DressCode: FC = () => {
  const dressCode = useRef<HTMLDivElement>(null);
  const { state, props } = useH2Appearing();
  const { RenderLetters } = useLettersAppearing({
    speed: 0.9,
    center: true,
    disable: !state.isAppeared,
  });

  useSectionRegistration({
    id: sectionId,
    ref: dressCode,
    label: sectionLabel,
  });

  return (
    <Section ref={dressCode} color={Color.dark}>
      <Container>
        <Heading color={Color.white} {...props}>
          Дресс-код
        </Heading>

        <Heading
          color={Color.white}
          variant={HeadingVariant.h4}
          className={styles.subtitle}
        >
          <RenderLetters value="Нам будет приятно, если при выборе наряда на торжество, учтете цвета свадьбы" />
        </Heading>

        <Hearts />
      </Container>
    </Section>
  );
};
