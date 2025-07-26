import { FC } from "react";
import Image from "next/image";
import { motion as m } from "motion/react";
import styles from "./styles.module.scss";

export const Hearts: FC = () => {
  return (
    <div className={styles.hearts}>
      {new Array(6).fill("").map((_, i) => (
        <m.div
          key={`heart-${i + 1}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + i / 14 }}
        >
          <Image
            alt="Дресс-код: сердце с одним из цветов свадьбы"
            src={`/dressCode/heart-${i + 1}.png`}
            className={styles.img}
            quality={100}
            height={131}
            width={156}
          />
        </m.div>
      ))}
    </div>
  );
};
