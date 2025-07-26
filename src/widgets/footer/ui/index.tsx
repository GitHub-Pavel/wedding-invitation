import { FC } from "react";
import { Color } from "@/shared/const/styles";
import { Container } from "@/shared/ui/container";
import { Heading, HeadingAlign } from "@/shared/ui/heading";
import { Section } from "@/shared/ui/section";
import styles from "./styles.module.scss";
import { useH2Appearing } from "@/features/h2-appearing";
import clsx from "clsx";
import Image from "next/image";

export const Footer: FC = () => {
  const { props } = useH2Appearing();

  return (
    <Section className={styles.section} color={Color.dark}>
      <Container>
        <Heading
          italic
          {...props}
          lineSize={350}
          color={Color.white}
          align={HeadingAlign.left}
          className={clsx(styles.heading, props.className)}
        >
          С нетерпением ждем встречи, <br /> Руслан и Алина!
        </Heading>
      </Container>

      <Image
        width={1344}
        height={768}
        quality={100}
        alt="Задний фон для подвала"
        src="/footer/background.jpg"
        className={styles.background}
      />
    </Section>
  );
};
