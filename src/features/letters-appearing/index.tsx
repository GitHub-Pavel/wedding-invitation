import { useAnimate, useInView } from "motion/react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { receiveCentralityRank } from "@/shared/utils/array";
import styles from "./letters-appearing.module.scss";
import clsx from "clsx";
import { PropsWithClassname } from "@/shared/types";

interface LettersAppearingOptions {
  disable: boolean;
  center?: boolean;
  view?: boolean;
  speed: number;
  delay: number;
}

const initOpts: LettersAppearingOptions = {
  disable: false,
  center: false,
  speed: 1.2,
  delay: 0.1,
};

type LineInfo = {
  number: number;
  letters: number[];
};

interface RenderLettersProps extends PropsWithClassname {
  value: string;
}

export const useLettersAppearing = (
  options?: Partial<LettersAppearingOptions>
) => {
  const [isAppeared, setIsAppeared] = useState(false);
  const { delay, disable, speed, center, view } = { ...initOpts, ...options };

  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const inView = useInView(scope, {
    margin: "0px 0px -10%",
  });

  const [letters, setLetters] = useState<Array<HTMLSpanElement>>([]);
  const lettersRef = useRef<Array<HTMLSpanElement>>([]);

  const columns: Record<number, LineInfo> = useMemo(() => {
    const value: Record<number, LineInfo> = {};

    let number = 0;
    for (const l of letters) {
      if (!value[l.offsetTop]) {
        number++;
        value[l.offsetTop] = {
          number,
          letters: [l.offsetLeft],
        };
        continue;
      }

      value[l.offsetTop].letters.push(l.offsetLeft);
    }

    return value;
  }, [letters]);

  const calculation = useMemo(
    () => [
      async (letter: HTMLSpanElement, index: number) => {
        await animate(
          letter,
          { opacity: 1 },
          {
            delay: (speed / 95) * index + delay,
            duration: speed / 15,
            ease: "circOut",
          }
        );
      },
      async (letter: HTMLSpanElement) => {
        const defAnim = async () =>
          await animate(
            letter,
            { opacity: 1 },
            {
              duration: 1,
              ease: "backOut",
            }
          );

        const column = columns[letter.offsetTop];
        if (!column) return await defAnim();

        const row = receiveCentralityRank(column.letters, letter.offsetLeft);
        if (row === -1) return await defAnim();

        await animate(
          letter,
          { opacity: 1 },
          {
            delay:
              (speed / 80) * ((column.number - 1) * 10 + (row - 1)) + delay,
            duration: speed / 15,
            ease: "circOut",
          }
        );
      },
    ],
    [animate, delay, speed, columns]
  );

  const handleLetter = useCallback(
    (str: string) => (e: HTMLSpanElement | null) => {
      if (!e) return;
      if (str.length === lettersRef.current.length) {
        lettersRef.current = [];
      }
      lettersRef.current.push(e);
    },
    []
  );

  const RenderLetters: FC<RenderLettersProps> = useCallback(
    ({ value, className }) => (
      <span ref={scope} className={className}>
        {value.split("").map((letter, i) => (
          <span
            key={letter + i}
            ref={handleLetter(value)}
            className={clsx(styles.letter)}
          >
            {letter}
          </span>
        ))}
      </span>
    ),
    [handleLetter, scope]
  );

  const active = useCallback(() => {
    letters.map(async (letter, i) => {
      await calculation[+!!center]?.(letter, i);
      letter.classList.remove(styles.letter);
      if (i === letters.length - 1) {
        setIsAppeared(true);
      }
    });
  }, [calculation, center, letters]);

  const diactivate = useCallback(() => {
    letters.map((letter) => animate(letter, { opacity: 0 }, { duration: 0.4 }));
    setIsAppeared(false);
  }, [animate, letters]);

  useEffect(() => {
    if (view === true) {
      return;
    }

    if (!inView || disable) {
      if (isAppeared) diactivate();
      return;
    }

    if (!isAppeared) active();
  }, [active, diactivate, disable, inView, isAppeared, view]);

  useEffect(() => {
    if (view) {
      active();
      return;
    }
    if (view === false) diactivate();
  }, [active, diactivate, view]);

  useEffect(() => {
    if (!lettersRef.current.length) return;
    setLetters(lettersRef.current);
  }, []);

  return useMemo(
    () => ({ RenderLetters, isAppeared }),
    [RenderLetters, isAppeared]
  );
};
