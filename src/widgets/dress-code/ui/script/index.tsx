import { FC } from "react";
import { motion as m } from "motion/react";
import { Color } from "@/shared/const/styles";
import { Heading, HeadingAlign, HeadingVariant } from "@/shared/ui/heading";
import { useLettersAppearing } from "@/features/letters-appearing";
import styles from "./styles.module.scss";

const transition = { duration: 0.6, delay: 0.3 };

export const Script: FC = () => {
  const { RenderLetters } = useLettersAppearing({ center: false });

  return (
    <div className={styles.wrap}>
      <m.div
        className={styles.top}
        transition={transition}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Основной принцип
      </m.div>
      <Heading
        color={Color.white}
        align={HeadingAlign.left}
        variant={HeadingVariant.h1}
        className={styles.script}
        tagName="h3"
        italic
      >
        <RenderLetters value="“Прилично, со скромностью и здравомыслием”" />
      </Heading>
      <m.div
        className={styles.bot}
        transition={transition}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        1 Тимофею 2:9
      </m.div>
    </div>
  );
};
