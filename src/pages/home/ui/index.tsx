"use client";

import clsx from "clsx";
import { FC } from "react";
import dynamic from "next/dynamic";
import { Primary } from "@/widgets/primary";
import { useHomeInitial } from "../module";
import styles from "./styles.module.scss";

const Header = dynamic(
  () => import("@/widgets/header").then((module) => module.Header),
  { ssr: false }
);
const DateTime = dynamic(
  () => import("@/widgets/date-time").then((module) => module.DateTime),
  { ssr: false }
);
const Date = dynamic(
  () => import("@/widgets/date").then((module) => module.Date),
  { ssr: false }
);
const DressCode = dynamic(
  () => import("@/widgets/dress-code").then((module) => module.DressCode),
  { ssr: false }
);

export const HomePage: FC = () => {
  const {
    handlePrimaryAppeared,
    handleLogoClick,
    primaryAppeared,
    headerVariants,
  } = useHomeInitial();

  return (
    <div className={clsx({ [styles.hide]: !primaryAppeared })}>
      <Header variants={headerVariants} onLogoClick={handleLogoClick} />
      <Primary onAppeared={handlePrimaryAppeared} />
      <DateTime />
      <Date />
      <DressCode />
    </div>
  );
};
