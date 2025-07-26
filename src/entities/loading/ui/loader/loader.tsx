"use client";

import { FC, useCallback, useEffect, useState } from "react";
import styles from "./loader.module.scss";
import { useLoading, useSetLoading } from "../../model";
import { useAnimate } from "motion/react";

export const Loader: FC = () => {
  const { loading } = useLoading();
  const setLoading = useSetLoading();
  const [scope, animate] = useAnimate();
  const [isEndTimer, setIsEndTimer] = useState(false);

  const handleAnimate = useCallback(async () => {
    await animate(scope.current, { opacity: 0 }, { duration: 0.4 });
    setLoading({ loaded: true });
  }, []);

  useEffect(() => {
    setTimeout(() => setIsEndTimer(true), 800);
  }, []);

  useEffect(() => {
    if (!isEndTimer || loading) return;
    setLoading({ loading: true });
  }, [isEndTimer, loading, setLoading]);

  useEffect(() => {
    if (!loading) return;
    handleAnimate();
  }, [handleAnimate, loading]);

  return (
    <div className={styles.wrap} ref={scope}>
      <div className="heart" />
    </div>
  );
};
