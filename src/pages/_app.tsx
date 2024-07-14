import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoadingContext, useLoading } from "@/app/utils/loading_context";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <LoadingContext.Provider value={useLoading()}>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ToastContainer position="bottom-right" />
            <ReactQueryDevtools initialIsOpen={false} />
          </HydrationBoundary>
        </QueryClientProvider>
      </NextUIProvider>
    </LoadingContext.Provider>
  );
}
