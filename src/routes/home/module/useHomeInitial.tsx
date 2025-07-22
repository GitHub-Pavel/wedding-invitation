import { HeaderVariants } from "@/widgets/header";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useHomeInitial = () => {
  const [primaryAppeared, setPrimaryAppeared] = useState(false);
  const [hasDarkHeader, setHasDarkHeader] = useState(false);

  const headerVariants = useMemo<HeaderVariants[]>(() => {
    const variants: HeaderVariants[] = [];
    if (!hasDarkHeader) {
      variants.push(HeaderVariants.advanced);
    }
    if (!primaryAppeared) {
      variants.push(HeaderVariants.hidden);
    }
    return variants;
  }, [hasDarkHeader, primaryAppeared]);

  const handlePageScroll = useCallback(() => {
    if (typeof window === undefined) return;
    if (window.scrollY <= 100) {
      setHasDarkHeader(false);
      return;
    }
    setHasDarkHeader(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handlePageScroll);
    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  }, [handlePageScroll]);

  const handleLogoClick = useCallback(() => {
    if (typeof window === undefined) return;

    if (window.scrollY === 0) {
      location.reload();
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handlePrimaryAppeared = useCallback(() => setPrimaryAppeared(true), []);

  return useMemo(
    () => ({
      headerVariants,
      primaryAppeared,
      handleLogoClick,
      handlePrimaryAppeared,
    }),
    [handleLogoClick, handlePrimaryAppeared, headerVariants, primaryAppeared]
  );
};
