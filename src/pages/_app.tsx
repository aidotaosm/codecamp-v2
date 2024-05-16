import {
  AppContextComponent,
  IncrementContext,
} from "@/components/practice/AppContext";
import FooterComponent from "@/components/practice/Footer";
import HeaderComponent from "@/components/practice/Header";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { Suspense } from "react";
import { useEffect } from "react";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  const ReactQueryDevtoolsProduction = lazy(() =>
    import("@tanstack/react-query-devtools/build/modern/production.js").then(
      (d) => ({
        default: d.ReactQueryDevtools,
      })
    )
  );
  const [showDevtools, setShowDevtools] = useState(false);
  useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AppContextComponent>
          <HeaderComponent />
          <main className="h-screen">
            <Component {...pageProps} />
          </main>
          <FooterComponent />
        </AppContextComponent>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
      {showDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
