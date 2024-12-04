"use client";

import { SnackbarProvider } from "notistack";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      autoHideDuration={2000}
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      {children}
    </SnackbarProvider>
  );
}
