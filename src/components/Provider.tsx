"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noHeaderPaths = ["/search"];

  return (
    <main className={`${noHeaderPaths.includes(pathname) ? "" : "pt-25"}`}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </main>
  );
}
