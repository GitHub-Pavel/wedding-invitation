import { PropsWithClassname, PropsWithScopes } from "@/shared/types";
import { FC } from "react";
import { ImageScopes } from "../../model";
import clsx from "clsx";
import Image from "next/image";
import styles from "./images.module.scss";

export const Images: FC<PropsWithClassname<PropsWithScopes<ImageScopes>>> = ({
  scopes,
  className,
}) => {
  return (
    <div
      ref={scopes?.scope3}
      className={clsx(className, styles.wrap, "images")}
    >
      <Image
        alt="Руслан"
        ref={scopes?.scope1}
        className={clsx(styles.image, "images__image")}
        src="/primary/image-1.png"
        quality={100}
        height={257}
        width={186}
        priority
      />
      <Image
        alt="Алина"
        ref={scopes?.scope2}
        className={clsx(styles.image, "images__image")}
        src="/primary/image-2.png"
        quality={100}
        height={246}
        width={166}
        priority
      />
    </div>
  );
};
