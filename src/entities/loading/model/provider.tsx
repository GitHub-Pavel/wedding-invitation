"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useSetLoading } from "./store";

export const LoadingProvider: FC<PropsWithChildren> = ({ children }) => {
  const setLoading = useSetLoading();

  useEffect(() => {
    setLoading({
      loaded: true,
    });
  }, []);

  return children;
};
