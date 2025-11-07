import "@/styles/globals.css";
import { cn } from "../utils/cn";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { ToasterProvider } from "@/contexts/ToasterContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { SessionProvider } from "next-auth/react";

const jakartaPlusSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-primary",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <HeroUIProvider>
            <Head>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                integrity="sha512-p+cGpCzR6v4DLYDW7sSY+5KqMw9vM7e5wKZkSaLJgRjC5B5V2lb3+1Q6BB7pN7YB4dzQfkn07hHj6lZgHkeFeg=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </Head>

            <main className={cn(jakartaPlusSans.className)}>
              <ToasterProvider>
                <Component {...pageProps} />
              </ToasterProvider>
            </main>
          </HeroUIProvider>
        </SearchProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
