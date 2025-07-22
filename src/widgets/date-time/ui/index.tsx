import { FC, useRef } from "react";
import { Heading, HeadingAlign } from "@/shared/ui/heading";
import styles from "./styles.module.scss";
import { Container } from "@/shared/ui/container";
import { Color } from "@/shared/const/styles";
import Image from "next/image";
import { useH2Appearing } from "@/features/h2-appearing";
import { useDateTime } from "../model/useDateTime";

export const DateTime: FC = () => {
  const dateTime = useRef<HTMLDivElement>(null);
  const { scope1, scope2 } = useDateTime(dateTime);
  const { props } = useH2Appearing(dateTime, {
    margin: "0px 0px -500px",
  });

  return (
    <div ref={dateTime} className={styles.dateTime}>
      <Container className={styles.container}>
        <Heading
          {...props}
          color={Color.white}
          align={HeadingAlign.center}
          scopes={{ ...props.scopes, wrap: scope1 }}
        >
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
        ref={scope2}
        priority
      />
    </div>
  );
};
