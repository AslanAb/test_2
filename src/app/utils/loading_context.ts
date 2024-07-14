import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);
  return { isLoading, setIsLoading };
};

export const LoadingContext = createContext<any>(null);

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
