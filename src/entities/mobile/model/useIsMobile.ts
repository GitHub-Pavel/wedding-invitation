import { useDebounce } from "@react-hook/debounce";
import { useCallback, useEffect } from "react";

const mediaEndpoint = 968;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useDebounce(false);

  const handleWindowResize = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.innerWidth > mediaEndpoint) {
      setIsMobile(false);
      return;
    }

    setIsMobile(true);
  }, [setIsMobile]);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return isMobile;
};
