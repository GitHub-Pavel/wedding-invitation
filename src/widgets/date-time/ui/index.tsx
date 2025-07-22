import { FC, useRef } from "react";
import { Heading, HeadingAlign } from "@/shared/ui/heading";
import styles from "./styles.module.scss";
import { Container } from "@/shared/ui/container";
import { Color } from "@/shared/const/styles";
import Image from "next/image";

export const DateTime: FC = () => {
  const dateTime = useRef<HTMLDivElement>(null);

  return (
    <div ref={dateTime} className={styles.dateTime}>
      <Container>
        <Heading align={HeadingAlign.center} color={Color.white}>
          Дата и время
        </Heading>
      </Container>

      <Image
        src="/dateTime/background.png"
        alt="Дата и время: пейзаж"
        className={styles.bg}
        quality={100}
        width={1440}
        height={937}
        priority
      />
    </div>
  );
};
