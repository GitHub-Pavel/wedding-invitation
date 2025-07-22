import { FC } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

export const Hearts: FC = () => {
  return (
    <div className={styles.hearts}>
      {new Array(6).fill("").map((_, i) => (
        <Image
          alt="Дресс-код: сердце с одним из цветов свадьбы"
          src={`/dressCode/heart-${i + 1}.png`}
          key={`heart-${i + 1}`}
          quality={100}
          height={143}
          width={170}
        />
      ))}
    </div>
  );
};
