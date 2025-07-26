import { FC, useRef } from "react";
import { Heading } from "@/shared/ui/heading";
import { Section } from "@/shared/ui/section";
import { Container } from "@/shared/ui/container";
import { useH2Appearing } from "@/features/h2-appearing";
import { useLettersAppearing } from "@/features/letters-appearing";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useSectionRegistration } from "@/shared/sections";

export const Invitation: FC = () => {
  const parent = useRef(null);
  const { props, state } = useH2Appearing(parent, {
    margin: "0% 0px -50%",
  });
  const P1 = useLettersAppearing({
    disable: !state.isAppeared,
    view: state.isAppeared,
    center: true,
  });
  const P2 = useLettersAppearing({
    disable: !P1.isAppeared,
    view: P1.isAppeared,
    center: true,
  });
  const P3 = useLettersAppearing({
    disable: !P2.isAppeared,
    view: P2.isAppeared,
    center: true,
  });
  const P4 = useLettersAppearing({
    disable: !P3.isAppeared,
    view: P3.isAppeared,
    center: true,
  });
  const P5 = useLettersAppearing({
    disable: !P4.isAppeared,
    view: P4.isAppeared,
    center: true,
  });

  useSectionRegistration({
    id: "inv",
    label: "Пожелание",
    ref: parent,
  });

  return (
    <Section className={styles.section} ref={parent}>
      <Container>
        <Heading {...props}>Пожелание</Heading>
        <div className={styles.wrap}>
          <P1.RenderLetters value="Дорогие наши родные и друзья!" />
          <P2.RenderLetters value="Мы счастливы пригласить вас на нашу свадьбу! Для нас важно, чтобы этот праздник прошел для всех в теплой и душевной атмосфере, наполненной любовью и радостью." />
          <P3.RenderLetters value="Мы постарались организовать этот день так, чтобы всем было комфортно, весело и уютно." />
          <P4.RenderLetters value="Как сказано в Библии: «Только пусть всё проходит пристойно и организованно» (1 Кор. 14:40).  Давайте вместе создадим атмосферу настоящего праздника – с искренними улыбками и счастливыми моментами!" />
          <P5.RenderLetters value="Ваше присутствие для нас – самый ценный подарок в этот особенный момент нашей жизни!" />
        </div>
      </Container>

      <div className={clsx(styles.circle, styles.c1)} />
      <div className={clsx(styles.circle, styles.c2)} />
      <div className={clsx(styles.circle, styles.c3)} />
    </Section>
  );
};
