import clsx from "clsx";
import Image from "next/image";
import { FC, useRef } from "react";
import { Heading, HeadingAlign, HeadingScopes } from "@/shared/ui/heading";
import { Color } from "@/shared/const/styles";
import { Container } from "@/shared/ui/container";
import { useH2Appearing } from "@/features/h2-appearing";
import { useDateTime } from "../model/useDateTime";
import styles from "./styles.module.scss";
import { useSectionRegistration } from "@/shared/sections";

const sectionId = "dateTime";
const sectionLabel = "Когда?";

export const DateTime: FC = () => {
  const dateTime = useRef<HTMLDivElement>(null);
  const { scope1, scope2 } = useDateTime(dateTime);
  const { props } = useH2Appearing(dateTime, {
    margin: "0px 0px -500px",
  });
  const scopes: HeadingScopes = { ...props.scopes, wrap: scope1 };

  useSectionRegistration({
    id: sectionId,
    label: sectionLabel,
    ref: dateTime,
  });

  return (
    <div ref={dateTime} className={styles.dateTime}>
      <Container className={styles.container}>
        <Heading
          ref={props.ref}
          scopes={scopes}
          color={Color.white}
          align={HeadingAlign.center}
          className={clsx(props.className)}
        >
          Этой Осенью
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
