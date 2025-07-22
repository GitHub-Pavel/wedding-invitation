"use client";

import clsx from "clsx";
import { memo, useEffect, useRef } from "react";
import { IconButton } from "@/shared/ui/icon-button";
import { Heading } from "@/shared/ui/heading";
import { ArrowDown } from "@/shared/icons/arrow-down";
import { HeadingVariant } from "@/shared/ui/heading/const";
import { useBackground, useToDown } from "../../model";
import { Background } from "../background";
import { useLoading } from "@/entities/loading";
import { useLettersAppearing } from "@/entities/letters-appearing";
import { Images } from "../images";
import { useImages } from "../../model/useImages";
import { Container } from "@/shared/ui/container";
import { useSectionRegistration } from "@/shared/sections";
import { useScrollParallax } from "../../model/useScrollParallax";
import styles from "./primary.module.scss";
import mergeRefs from "merge-refs";

interface PrimaryProps {
  onAppeared?: () => void;
}

const sectionId = "primary-section";
const sectionLabel = "Приглашение";

const _primary = memo<PrimaryProps>(({ onAppeared }) => {
  const { loaded } = useLoading();
  const primary = useRef<HTMLDivElement>(null);
  const { state: bgState, scopes: bgScopes } = useBackground(primary);
  const hasHadingAppearing = !bgState.isAppeared || !loaded;
  const { RenderLetters, isAppeared: isHeadingAppeared } = useLettersAppearing(
    primary,
    { disable: hasHadingAppearing, center: true }
  );
  const { state: imgState, scopes: imgScopes } = useImages(
    primary,
    !isHeadingAppeared
  );
  const { scopes: toDownScopes, state: toDownState } = useToDown(
    primary,
    !imgState.isAppeared
  );
  const primaryScope = useScrollParallax(primary, {
    disable: !toDownState.isAppeared,
    scopes: {
      background: bgScopes,
      toDown: toDownScopes,
      images: imgScopes,
    },
  });

  const handleToDown = () => {
    if (!primary.current) return;
    window.scrollTo({
      behavior: "smooth",
      top: primary.current.offsetTop + primary.current.offsetHeight,
    });
  };

  useEffect(() => {
    if (!toDownState.isAppeared) return;
    onAppeared?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toDownState.isAppeared]);

  useSectionRegistration({
    ref: primary,
    id: sectionId,
    label: sectionLabel,
  });

  return (
    <div
      id={sectionId}
      ref={mergeRefs(primary, primaryScope)}
      className={clsx(styles.primary, {
        [styles.dark]: toDownState.isAppeared,
      })}
    >
      <Container>
        <div className={styles.wrap}>
          <Heading className={styles.heading} variant={HeadingVariant.h1}>
            <RenderLetters value="Приглашаем тебя на нашу свадьбу!" />
          </Heading>

          <Images className={styles.images} scopes={imgScopes} />
        </div>
      </Container>

      <IconButton
        icon={ArrowDown}
        scopes={toDownScopes}
        onClick={handleToDown}
        className={styles.toDown}
      >
        Гортать вниз
      </IconButton>

      <Background className={styles.background} scopes={bgScopes} />
    </div>
  );
});
_primary.displayName = "Primary";
export const Primary = _primary;
