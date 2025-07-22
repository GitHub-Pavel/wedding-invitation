import { FC } from "react";
import Image from "next/image";
import { PropsWithClassname, PropsWithScopes } from "@/shared/types";
import { BackgroundScopes } from "../../model";
import styles from "./background.module.scss";
import clsx from "clsx";

const WIDTH = 1439;
const HEIGHT = 785;

export const Background: FC<
  PropsWithClassname<PropsWithScopes<BackgroundScopes>>
> = ({ scopes, className }) => {
  return (
    <div className={clsx(styles.wrap, className, "background")}>
      <Image
        ref={scopes?.scope4}
        alt="Четвертая часть анимации главного экрана"
        className={clsx(styles.image, "background__image")}
        src="/primary/primary-background-4-enhanced.png"
        height={HEIGHT}
        width={WIDTH}
        quality={100}
        priority
      />
      <Image
        ref={scopes?.scope3}
        alt="Третья часть анимации главного экрана"
        className={clsx(styles.image, "background__image")}
        src="/primary/primary-background-3-enhanced.png"
        height={HEIGHT}
        width={WIDTH}
        quality={100}
        priority
      />
      <Image
        ref={scopes?.scope2}
        alt="Вторая часть анимации главного экрана"
        className={clsx(styles.image, "background__image")}
        src="/primary/primary-background-2-enhanced.png"
        height={HEIGHT}
        width={WIDTH}
        quality={100}
        priority
      />
      <Image
        ref={scopes?.scope1}
        alt="Первая часть анимации главного экрана"
        className={clsx(styles.image, "background__image")}
        src="/primary/primary-background-1-enhanced.png"
        height={HEIGHT}
        width={WIDTH}
        quality={100}
        priority
      />
      <div
        ref={scopes?.scope5}
        className={clsx(styles.gradient, "background__gradient")}
      />
    </div>
  );
};
